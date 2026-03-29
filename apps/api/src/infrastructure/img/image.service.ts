import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import sharp from "sharp";
import * as fs from "fs/promises";
import * as path from "path";

import {
    IMAGE_ENTITY_CONFIG,
    MIME_TO_EXT,
    UPLOADS_IMAGE_ROOT,
} from "./image.config";
import { ImageProcessingConfig } from "./image.types";
import { Image, ImageEntityType } from "@/generated/prisma";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { randomUUID as uuidv4 } from "crypto";
import { env } from "@/config";
import { ImageDto } from "@myorg/shared/dto";
import { mapImage } from "@/infrastructure/img/image.mapper";

interface ProcessedFile {
    id: string;
    filename: string;
    mimeType: string;
    width: number;
    height: number;
    size: number;
}

@Injectable()
export class ImageService {
    private readonly logger = new Logger(ImageService.name);

    constructor(private readonly prisma: PrismaService) {}

    // ── Upload ────────────────────────────────────────────────────────────────

    async upload(
        file: Express.Multer.File,
        entityType: ImageEntityType,
        options: ImageProcessingConfig,
    ): Promise<ImageDto> {
        const folder = this.resolveFolder(entityType);
        await fs.mkdir(folder, { recursive: true });

        // Stage 1: write file to disk
        const processed = await this.processFile(file, folder, options);

        // Stage 2: persist to DB, rollback file on failure
        try {
            const image = await this.prisma.image.create({
                data: { ...processed, entityType },
            });
            return mapImage(image);
        } catch (err) {
            await this.cleanupFiles(folder, [processed.filename]);
            throw err;
        }
    }

    // ── Upload Many (atomic) ──────────────────────────────────────────────────

    async uploadMany(
        files: Express.Multer.File[],
        entityType: ImageEntityType,
        options: ImageProcessingConfig,
    ): Promise<ImageDto[]> {
        const folder = this.resolveFolder(entityType);
        await fs.mkdir(folder, { recursive: true });

        const processed: ProcessedFile[] = [];

        // Stage 1: write all files to disk sequentially
        // Sequential (not Promise.all) — чтобы при ошибке точно знать что откатывать
        for (const file of files) {
            try {
                const result = await this.processFile(file, folder, options);
                processed.push(result);
            } catch (err) {
                await this.cleanupFiles(
                    folder,
                    processed.map((p) => p.filename),
                );
                throw err;
            }
        }

        // Stage 2: single DB transaction — либо все, либо никто
        try {
            const images = await this.prisma.$transaction(
                processed.map((p) =>
                    this.prisma.image.create({
                        data: { ...p, entityType },
                    }),
                ),
            );
            return images.map((img) => mapImage(img));
        } catch (err) {
            await this.cleanupFiles(
                folder,
                processed.map((p) => p.filename),
            );
            throw err;
        }
    }

    // ── Delete ────────────────────────────────────────────────────────────────

    async delete(id: string): Promise<void> {
        const image = await this.prisma.image.findUnique({ where: { id } });
        if (!image) throw new NotFoundException("image.notFound");

        const folder = this.resolveFolder(image.entityType);
        await fs
            .unlink(path.join(folder, image.filename))
            .catch((e) =>
                this.logger.warn(
                    `Failed to delete image file: ${image.filename}`,
                    e,
                ),
            );
        await this.prisma.image.delete({ where: { id } });
    }

    // ── Find ──────────────────────────────────────────────────────────────────

    async findById(id: string): Promise<ImageDto> {
        const image = await this.prisma.image.findUnique({ where: { id } });
        if (!image) throw new NotFoundException("image.notFound");
        return mapImage(image);
    }

    // ── Private ───────────────────────────────────────────────────────────────

    /**
     * Обрабатывает один файл (конвертация / ресайз) и записывает его на диск.
     * Не трогает БД — только файловая система.
     */
    private async processFile(
        file: Express.Multer.File,
        folder: string,
        options: ImageProcessingConfig,
    ): Promise<ProcessedFile> {
        const id = uuidv4();
        let filename: string | undefined;

        try {
            if (options.mode === "original") {
                const ext =
                    MIME_TO_EXT[file.mimetype] ??
                    file.mimetype.split("/")[1] ??
                    "bin";
                filename = `${id}.${ext}`;
                await fs.writeFile(path.join(folder, filename), file.buffer);
                const meta = await sharp(file.buffer).metadata();
                return {
                    id,
                    filename,
                    mimeType: file.mimetype,
                    width: meta.width ?? 0,
                    height: meta.height ?? 0,
                    size: file.size,
                };
            } else if (options.mode === "webp") {
                filename = `${id}.webp`;
                const result = await sharp(file.buffer)
                    .webp({ quality: options.quality ?? 85 })
                    .toFile(path.join(folder, filename));
                return {
                    id,
                    filename,
                    mimeType: "image/webp",
                    width: result.width,
                    height: result.height,
                    size: result.size,
                };
            } else {
                // webp-resize
                filename = `${id}.webp`;
                const result = await sharp(file.buffer)
                    .resize(options.width, options.height, {
                        fit: options.fit ?? "cover",
                    })
                    .webp({ quality: options.quality ?? 85 })
                    .toFile(path.join(folder, filename));
                return {
                    id,
                    filename,
                    mimeType: "image/webp",
                    width: result.width,
                    height: result.height,
                    size: result.size,
                };
            }
        } catch (err) {
            if (filename) {
                await fs
                    .unlink(path.join(folder, filename))
                    .catch((e) =>
                        this.logger.warn(
                            `Failed to cleanup file after processing error: ${filename}`,
                            e,
                        ),
                    );
            }
            throw err;
        }
    }

    /**
     * Удаляет список файлов параллельно. Ошибки не пробрасывает — только логирует.
     */
    private async cleanupFiles(
        folder: string,
        filenames: string[],
    ): Promise<void> {
        await Promise.all(
            filenames.map((filename) =>
                fs
                    .unlink(path.join(folder, filename))
                    .catch((e) =>
                        this.logger.warn(
                            `Failed to cleanup file: ${filename}`,
                            e,
                        ),
                    ),
            ),
        );
    }

    private resolveFolder(entityType: ImageEntityType): string {
        const config = IMAGE_ENTITY_CONFIG[entityType];
        return path.resolve(process.cwd(), UPLOADS_IMAGE_ROOT, config.folder);
    }
}
