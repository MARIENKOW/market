import { FileEntityType } from "@/generated/prisma";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PagedResult, VideoDto } from "@myorg/shared/dto";
import { VideoService } from "@/infrastructure/file/video/video.service";
import { mapVideo } from "@/infrastructure/file/video/video.mapper";

@Injectable()
export class BlogVideoService {
    constructor(
        private prisma: PrismaService,
        private video: VideoService,
    ) {}
    private readonly logger = new Logger(BlogVideoService.name);
    async upload(file: Express.Multer.File): Promise<VideoDto> {
        return this.video.upload(file, FileEntityType.BLOG_UPLOAD_VIDEO, {
            mode: "original",
        });
    }
    async getAll(page: number, limit: number): Promise<PagedResult<VideoDto>> {
        const where = { entityType: FileEntityType.BLOG_UPLOAD_VIDEO };
        const [total, videos] = await this.prisma.$transaction([
            this.prisma.video.count({ where }),
            this.prisma.video.findMany({
                where,
                include: { image: true },
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
        ]);
        return {
            data: videos.map(mapVideo),
            meta: {
                page,
                limit,
                total,
                pageCount: Math.ceil(total / limit),
            },
        };
    }
    async delete(id: string): Promise<void> {
        const video = await this.prisma.video.findFirst({
            where: { id, entityType: FileEntityType.BLOG_UPLOAD_VIDEO },
        });
        if (!video) throw new NotFoundException();
        await this.video.delete(video.id);
    }
    async deleteAll(): Promise<void> {
        const videos = await this.prisma.video.findMany({
            where: { entityType: FileEntityType.BLOG_UPLOAD_VIDEO },
        });
        for (const video of videos) {
            await this.video.delete(video.id);
        }
    }
}
