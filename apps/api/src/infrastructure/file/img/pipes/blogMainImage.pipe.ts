import { PipeTransform, Injectable } from "@nestjs/common";
import { fromBuffer } from "file-type";
import { AllowedImageMimeType } from "../image.config";
import { BLOG_IMAGE_CONFIG, BlogOutput } from "@myorg/shared/form";
import { ValidationException } from "@/common/exception/validation.exception";

@Injectable()
export class blogMainImageValidationPipe implements PipeTransform {
    constructor() {}

    async transform(
        file: Express.Multer.File | undefined,
    ): Promise<Express.Multer.File> {
        return this.validateOne(file);
    }

    private async validateOne(
        file: Express.Multer.File | undefined,
    ): Promise<Express.Multer.File> {
        if (!file) {
            throw new ValidationException<BlogOutput>({
                fields: {
                    image: ["form.required"],
                },
            });
        }

        // Проверка реального типа по magic bytes — не доверяем заголовку
        const detected = await fromBuffer(file.buffer);

        if (
            !detected ||
            !BLOG_IMAGE_CONFIG.allowedMimeTypes.includes(
                detected.mime as AllowedImageMimeType,
            )
        ) {
            throw new ValidationException<BlogOutput>({
                fields: {
                    image: ["form.file.unsupportedType"],
                },
            });
        }

        // Подменяем mimetype на реальный — не тот что прислал клиент
        file.mimetype = detected.mime;

        // Проверка размера по конфигу сущности

        if (file.size > BLOG_IMAGE_CONFIG.maxFileSizeBytes) {
            throw new ValidationException<BlogOutput>({
                fields: {
                    image: ["form.file.blogImage.tooLarge"],
                },
            });
        }

        return file;
    }
}
