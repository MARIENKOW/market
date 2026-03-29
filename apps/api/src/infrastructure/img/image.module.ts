import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { ImageService } from "./image.service";
import { ImageController } from "@/infrastructure/img/image.controller";
import { UPLOADS_IMAGE_ROOT, IMAGE_ENTITY_PUBLIC } from "./image.config";
import { env } from "@/config";

// Генерируем ServeStaticModule.forRoot() для каждой публичной папки
const publicStaticModules = IMAGE_ENTITY_PUBLIC.map((entityConfig) =>
    ServeStaticModule.forRoot({
        rootPath: path.resolve(
            process.cwd(),
            UPLOADS_IMAGE_ROOT,
            entityConfig.folder,
        ),
        serveRoot: `/${env.NEXT_PUBLIC_API_GLOBAL_PREFIX}/${UPLOADS_IMAGE_ROOT}/${entityConfig.folder}`,
        serveStaticOptions: {
            index: false,
            fallthrough: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            immutable: true, //проверять ли после времени кеша
        },
    }),
);

@Module({
    imports: [...publicStaticModules],
    controllers: [ImageController],
    providers: [ImageService],
    exports: [ImageService],
})
export class ImageModule {}
