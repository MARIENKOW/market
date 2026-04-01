import { Auth, CurrentActor } from "@/modules/auth/decorators/auth.decorator";
import { VideoDto } from "@myorg/shared/dto";
import { ENDPOINT, FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import {
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { UserActor } from "@/modules/auth/auth.type";
import { FileInterceptor } from "@nestjs/platform-express";
import multer from "multer";
import { BlogVideoService } from "@/modules/blog/video/blogVideo.service";
import { randomUUID } from "crypto";
import * as os from "os";

const {} = ENDPOINT.blog.video;
const { path } = FULL_PATH_ENDPOINT.blog.video;

@Controller(path)
export class BlogVideoController {
    constructor(private blogVideo: BlogVideoService) {}
    @Post()
    @Auth("USER")
    @UseInterceptors(
        FileInterceptor("video", {
            storage: multer.diskStorage({
                // os.tmpdir() — стандартная temp-директория ОС, всегда существует
                destination: os.tmpdir(),
                // UUID — без originalname: user-controlled строка, path traversal риск
                filename: (_req, _file, cb) => cb(null, randomUUID()),
            }),
        }),
    )
    async upload(
        @UploadedFile()
        file: Express.Multer.File,
        @CurrentActor() actor: UserActor,
    ): Promise<VideoDto> {
        return this.blogVideo.upload(file);
    }
    @Get()
    @Auth('USER')
    async getAll():Promise<VideoDto[]>{
        return this.blogVideo.getAll()
    }   
}
