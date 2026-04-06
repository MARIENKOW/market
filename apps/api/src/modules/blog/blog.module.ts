import { HashService } from "@/infrastructure/hash/hash.service";
import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { Module } from "@nestjs/common";
import { BlogService } from "@/modules/blog/blog.service";
import { BlogController } from "@/modules/blog/blog.controller";
import { BlogVideoModule } from "@/modules/blog/video/blogVideo.module";
import { BlogImageModule } from "@/modules/blog/image/blogImage.module";

@Module({
    imports: [PrismaModule, BlogVideoModule,BlogImageModule],
    providers: [BlogService, HashService],
    controllers: [BlogController],
    exports: [BlogService],
})
export class BlogModule {}
