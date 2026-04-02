import { FileEntityType } from "@/generated/prisma";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { Injectable, Logger } from "@nestjs/common";
import { VideoDto } from "@myorg/shared/dto";
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
    async getAll(): Promise<VideoDto[]> {
        const videos = await this.prisma.video.findMany({
            where: { entityType: FileEntityType.BLOG_UPLOAD_VIDEO },
            include: {
                image: true,
            },
        });
        return videos.map(mapVideo);
    }
}
