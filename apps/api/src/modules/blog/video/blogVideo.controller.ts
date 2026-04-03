import { Auth, CurrentActor } from "@/modules/auth/decorators/auth.decorator";
import { PagedResult, VideoDto } from "@myorg/shared/dto";
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
    UnauthorizedException,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { UserActor } from "@/modules/auth/auth.type";
import { FileInterceptor } from "@nestjs/platform-express";
import multer from "multer";
import { BlogVideoService } from "@/modules/blog/video/blogVideo.service";
import { randomUUID } from "crypto";
import {
    signUploadToken,
    verifyUploadToken,
} from "@/infrastructure/file/file-sign.utils";
import { Public } from "@/modules/auth/decorators/public.decorator";
import { TMP_PATH } from "@/infrastructure/file/file.config";

const { upload } = ENDPOINT.blog.video;
const { path } = FULL_PATH_ENDPOINT.blog.video;

@Controller(path)
export class BlogVideoController {
    constructor(private blogVideo: BlogVideoService) {}

    @Get(upload.path)
    @Auth("USER")
    authorize(@CurrentActor() actor: UserActor): { uploadToken: string } {
        return { uploadToken: signUploadToken(actor.user.id) };
    }

    // ── 2. Загрузка — токен проверяется в fileFilter ──────────────
    // До записи файла на диск — но после открытия соединения.
    // После проверки файл грузится сколько угодно.
    @Post(upload.path)
    @Public()
    @UseInterceptors(
        FileInterceptor("video", {
            storage: multer.diskStorage({
                destination: TMP_PATH,
                filename: (_req, _file, cb) => cb(null, randomUUID()),
            }),
            fileFilter: (req: any, _file, cb) => {
                try {
                    const actorId = verifyUploadToken(req.query.uploadToken);
                    req.actorId = actorId;
                    cb(null, true);
                } catch {
                    cb(new UnauthorizedException("upload.tokenInvalid"), false);
                }
            },
        }),
    )
    async upload(
        @Req() req: Request & { actorId: string },
        @UploadedFile()
        file: Express.Multer.File,
    ): Promise<VideoDto> {
        return this.blogVideo.upload(file);
    }
    @Get()
    @Auth("USER")
    async getAll(
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query("limit", new DefaultValuePipe(12), ParseIntPipe) limit: number,
    ): Promise<PagedResult<VideoDto>> {
        return this.blogVideo.getAll(page, limit);
    }
    @Delete()
    @Auth("USER")
    async deleteAll(): Promise<void> {
        return this.blogVideo.deleteAll();
    }
    @Delete(":id")
    @Auth("USER")
    async delete(@Param("id") id: string): Promise<void> {
        return this.blogVideo.delete(id);
    }
}
