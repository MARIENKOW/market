import { FileEntityType, Prisma, User } from "@/generated/prisma";
import { SessionUserService } from "@/modules/auth/user/session/session.user.service";
import { HashService } from "@/infrastructure/hash/hash.service";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import {
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { ImageDto, UserDto, VideoDto } from "@myorg/shared/dto";
import { mapUser } from "@/modules/user/user.mapper";
import { ImageService } from "@/infrastructure/img/image.service";
import { Multer } from "multer";
import { VideoService } from "@/infrastructure/video/video.service";
import { mapVideo } from "@/infrastructure/video/video.mapper";

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
