import { HashService } from "@/infrastructure/hash/hash.service";
import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { Module } from "@nestjs/common";
import { BlogService } from "@/modules/blog/blog.service";
import { BlogController } from "@/modules/blog/blog.controller";
import { BlogVideoModule } from "@/modules/blog/video/blogVideo.module";

@Module({
    imports: [PrismaModule, BlogVideoModule],
    providers: [BlogService, HashService],
    controllers: [BlogController],
    exports: [BlogService],
})
export class BlogModule {}
