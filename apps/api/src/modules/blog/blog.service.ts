import { FileEntityType } from "@/generated/prisma";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { BlogDto, PagedResult } from "@myorg/shared/dto";
import { ImageService } from "@/infrastructure/file/img/image.service";
import { BlogWithoutImageOutput } from "@myorg/shared/form";
import { mapBlog } from "@/modules/blog/blog.mapper";

@Injectable()
export class BlogService {
    constructor(
        private prisma: PrismaService,
        private image: ImageService,
    ) {}
    private readonly logger = new Logger(BlogService.name);

    async create(
        { title, subtitle, body }: BlogWithoutImageOutput,
        file: Express.Multer.File,
    ): Promise<BlogDto> {
        const { id: imageId } = await this.image.upload(
            file,
            FileEntityType.BLOG_IMAGE,
            { mode: "original" },
        );

        try {
            const blog = await this.prisma.blog.create({
                data: {
                    title,
                    subtitle,
                    body,
                    date: new Date(),
                    time: new Date(),
                    imageId,
                },
                include: { image: true },
            });

            return mapBlog(blog);
        } catch (error) {
            this.logger.error(
                `Failed to create blog, rolling back uploaded image [imageId=${imageId}]`,
                error,
            );

            await this.image
                .delete(imageId)
                .catch((rollbackError) =>
                    this.logger.error(
                        `Rollback failed: could not delete orphaned image [imageId=${imageId}]`,
                        rollbackError,
                    ),
                );

            throw error;
        }
    }

    async getAll(page: number, limit: number): Promise<PagedResult<BlogDto>> {
        const [total, blogs] = await this.prisma.$transaction([
            this.prisma.blog.count(),
            this.prisma.blog.findMany({
                include: { image: true },
                orderBy: [{ isMain: "desc" }, { createdAt: "desc" }],
                skip: (page - 1) * limit,
                take: limit,
            }),
        ]);

        return {
            data: blogs.map(mapBlog),
            meta: { page, limit, total, pageCount: Math.ceil(total / limit) },
        };
    }
    async get(id: string): Promise<BlogDto> {
        const data = await this.prisma.blog.findUnique({
            where: { id },
            include: { image: true },
        });
        if (!data) throw new NotFoundException();
        return mapBlog(data);
    }

    async delete(id: string): Promise<void> {
        const blog = await this.prisma.blog.findUnique({
            where: { id },
            include: { image: true },
        });
        if (!blog) throw new NotFoundException();

        const imageId = blog.image.id;

        await this.prisma.blog.delete({ where: { id } });

        // Запись в БД удалена — файл удаляем отдельно.
        // Rollback БД-записи невозможен, поэтому только логируем
        // и при желании можно отправить в очередь для повторной попытки.
        await this.image
            .delete(imageId)
            .catch((error) =>
                this.logger.error(
                    `Blog [id=${id}] deleted but image [imageId=${imageId}] was not removed from storage. Manual cleanup required.`,
                    error,
                ),
            );
    }

    async setMain(id: string): Promise<BlogDto> {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) throw new NotFoundException();

        const newValue = !blog.isMain;

        if (newValue) {
            const [, updated] = await this.prisma.$transaction([
                this.prisma.blog.updateMany({
                    where: { isMain: true, id: { not: id } },
                    data: { isMain: false },
                }),
                this.prisma.blog.update({
                    where: { id },
                    data: { isMain: true },
                    include: { image: true },
                }),
            ]);
            return mapBlog(updated);
        }

        return mapBlog(
            await this.prisma.blog.update({
                where: { id },
                data: { isMain: false },
                include: { image: true },
            }),
        );
    }

    async setImportant(id: string): Promise<BlogDto> {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) throw new NotFoundException();
        return mapBlog(
            await this.prisma.blog.update({
                where: { id },
                data: { isImportant: !blog.isImportant },
                include: { image: true },
            }),
        );
    }

    async setShort(id: string): Promise<BlogDto> {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) throw new NotFoundException();
        return mapBlog(
            await this.prisma.blog.update({
                where: { id },
                data: { isShort: !blog.isShort },
                include: { image: true },
            }),
        );
    }

    async deleteAll(): Promise<void> {
        const blogs = await this.prisma.blog.findMany({
            include: { image: true },
        });

        const imageIds = blogs.map((b) => b.image.id);

        // Сначала удаляем все записи одной транзакцией
        await this.prisma.blog.deleteMany({
            where: { id: { in: blogs.map((b) => b.id) } },
        });

        // Затем удаляем файлы — каждый независимо, чтобы один сбой
        // не блокировал удаление остальных
        const results = await Promise.allSettled(
            imageIds.map((imageId) => this.image.delete(imageId)),
        );

        const failed = results
            .map((result, i) => ({ result, imageId: imageIds[i] }))
            .filter(({ result }) => result.status === "rejected");

        if (failed.length > 0) {
            failed.forEach(({ result, imageId }) =>
                this.logger.error(
                    `Orphaned image after deleteAll [imageId=${imageId}]. Manual cleanup required.`,
                    (result as PromiseRejectedResult).reason,
                ),
            );
        }
    }
}
