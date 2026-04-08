import { Auth } from "@/modules/auth/decorators/auth.decorator";
import { BlogDto, PagedResult } from "@myorg/shared/dto";
import { ENDPOINT, FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { BlogImageValidationPipe } from "@/infrastructure/file/img/pipes/blogImage.pipe";
import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { BlogService } from "@/modules/blog/blog.service";
import { ZodValidationPipe } from "@/common/pipe/zod-validation";
import {
    BlogSchemaWithoutImage,
    BlogWithoutImageOutput,
} from "@myorg/shared/form";
import { blogMainImageValidationPipe } from "@/infrastructure/file/img/pipes/blogMainImage.pipe";

const {} = ENDPOINT.blog;
const { path } = FULL_PATH_ENDPOINT.blog;

@Controller(path)
export class BlogController {
    constructor(
        private blog: BlogService,
    ) {}

    @Post()
    @Auth("ADMIN")
    @UseInterceptors(FileInterceptor("image", { storage: memoryStorage() }))
    async create(
        @Body(new ZodValidationPipe(BlogSchemaWithoutImage))
        body: BlogWithoutImageOutput,
        @UploadedFile(new blogMainImageValidationPipe())
        file: Express.Multer.File,
    ): Promise<BlogDto> {
        return this.blog.create(body, file);
    }
    

    @Get()
    @Auth("ADMIN")
    async getAll(
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query("limit", new DefaultValuePipe(6), ParseIntPipe) limit: number,
    ): Promise<PagedResult<BlogDto>> {
        return this.blog.getAll(page, limit);
    }
    @Get(":id")
    @Auth("ADMIN")
    async get(@Param("id") id: string): Promise<BlogDto> {
        return this.blog.get(id);
    }

    @Delete()
    @Auth("ADMIN")
    async deleteAll(): Promise<void> {
        return this.blog.deleteAll();
    }

    @Delete(":id")
    @Auth("ADMIN")
    async delete(@Param("id") id: string): Promise<void> {
        return this.blog.delete(id);
    }
}
