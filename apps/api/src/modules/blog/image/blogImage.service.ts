import { FileEntityType } from "@/generated/prisma";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ImageDto, PagedResult } from "@myorg/shared/dto";
import { ImageService } from "@/infrastructure/file/img/image.service";
import { mapImage } from "@/infrastructure/file/img/image.mapper";

@Injectable()
export class BlogImageService {
    constructor(
        private prisma: PrismaService,
        private image: ImageService,
    ) {}
    private readonly logger = new Logger(BlogImageService.name);
    async upload(file: Express.Multer.File): Promise<ImageDto> {
        return this.image.upload(file, FileEntityType.BLOG_IMAGE, {
            mode: "original",
        });
    }
    async getAll(page: number, limit: number): Promise<PagedResult<ImageDto>> {
        const where = { entityType: FileEntityType.BLOG_IMAGE };
        const [total, images] = await this.prisma.$transaction([
            this.prisma.image.count({ where }),
            this.prisma.image.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
        ]);
        return {
            data: images.map(mapImage),
            meta: {
                page,
                limit,
                total,
                pageCount: Math.ceil(total / limit),
            },
        };
    }
    async delete(id: string): Promise<void> {
        const image = await this.prisma.image.findFirst({
            where: { id, entityType: FileEntityType.BLOG_IMAGE },
        });
        if (!image) throw new NotFoundException();
        await this.image.delete(image.id);
    }
    async deleteAll(): Promise<void> {
        const images = await this.prisma.image.findMany({
            where: { entityType: FileEntityType.BLOG_IMAGE },
        });
        for (const image of images) {
            await this.image.delete(image.id);
        }
    }
}
