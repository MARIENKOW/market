import { HashService } from "@/infrastructure/hash/hash.service";
import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { Module } from "@nestjs/common";
import { BlogVideoService } from "@/modules/blog/video/blogVideo.service";
import { BlogVideoController } from "@/modules/blog/video/blogVideo.controller";
import { VideoModule } from "@/infrastructure/file/video/video.module";

@Module({
    imports: [PrismaModule, VideoModule],
    providers: [BlogVideoService, HashService],
    controllers: [BlogVideoController],
    exports: [BlogVideoService],
})
export class BlogVideoModule {}
