import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { Module } from "@nestjs/common";
import { BlogService } from "@/modules/blog/blog.service";
import { BlogController } from "@/modules/blog/blog.controller";
import { BlogVideoModule } from "@/modules/blog/video/blogVideo.module";
import { BlogImageModule } from "@/modules/blog/image/blogImage.module";
import { ImageModule } from "@/infrastructure/file/img/image.module";

@Module({
    imports: [PrismaModule, BlogVideoModule, BlogImageModule, ImageModule],
    providers: [BlogService],
    controllers: [BlogController],
    exports: [BlogService],
})
export class BlogModule {}
