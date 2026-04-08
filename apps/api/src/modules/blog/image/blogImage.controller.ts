import { Auth, CurrentActor } from "@/modules/auth/decorators/auth.decorator";
import { ImageDto, PagedResult, VideoDto } from "@myorg/shared/dto";
import { ENDPOINT, FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import {
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Req,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { UserActor } from "@/modules/auth/auth.type";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

import { signUploadToken } from "@/infrastructure/file/file-sign.utils";
import { BlogImageService } from "@/modules/blog/image/blogImage.service";
import { BlogImageValidationPipe } from "@/infrastructure/file/img/pipes/blogImage.pipe";

const { upload } = ENDPOINT.blog.image;
const { path } = FULL_PATH_ENDPOINT.blog.image;

@Controller(path)
export class BlogImageController {
    constructor(
        private blogImage: BlogImageService,
        private blogImagePipe: BlogImageValidationPipe,
    ) {}

    @Get(upload.path)
    @Auth('ADMIN')
    authorize(@CurrentActor() actor: UserActor): { uploadToken: string } {
        return { uploadToken: signUploadToken(actor.user.id) };
    }

    // ── 2. Загрузка — токен проверяется в fileFilter ──────────────
    // До записи файла на диск — но после открытия соединения.
    // После проверки файл грузится сколько угодно.

    @Post(upload.path)
    @UseInterceptors(FileInterceptor("image", { storage: memoryStorage() }))
    @Auth('ADMIN')
    async upload(
        @UploadedFile()
        file: Express.Multer.File,
        @CurrentActor() actor: UserActor,
    ): Promise<ImageDto> {
        const validation = await this.blogImagePipe.transform(file);
        return this.blogImage.upload(validation);
    }
    @Get()
    @Auth('ADMIN')
    async getAll(
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query("limit", new DefaultValuePipe(6), ParseIntPipe) limit: number,
    ): Promise<PagedResult<ImageDto>> {

        return this.blogImage.getAll(page, limit);
    }
    @Delete()
    @Auth('ADMIN')
    async deleteAll(): Promise<void> {
        return this.blogImage.deleteAll();
    }
    @Delete(":id")
    @Auth('ADMIN')
    async delete(@Param("id") id: string): Promise<void> {
        return this.blogImage.delete(id);
    }
}
