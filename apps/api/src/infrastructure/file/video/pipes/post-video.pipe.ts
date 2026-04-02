// import { PipeTransform, Injectable } from "@nestjs/common";
// import { fromBuffer } from "file-type";
// import * as fs from "fs/promises";
// import { VIDEO_POST_CONFIG, VideoPostUserInput } from "@myorg/shared/form";
// import { ValidationException } from "@/common/exception/validation.exception";

// type AllowedVideoMimeType = (typeof VIDEO_POST_CONFIG.allowedMimeTypes)[number];

// // Максимум байт, необходимых file-type для определения типа видео
// const MAGIC_BYTES_SIZE = 4_100;

// @Injectable()
// export class PostVideoValidationPipe implements PipeTransform {
//     async transform(
//         file: Express.Multer.File | Express.Multer.File[] | undefined,
//     ): Promise<Express.Multer.File | Express.Multer.File[]> {
//         if (Array.isArray(file)) {
//             return Promise.all(file.map((f) => this.validateOne(f)));
//         }
//         return this.validateOne(file);
//     }

//     private async validateOne(
//         file: Express.Multer.File | undefined,
//     ): Promise<Express.Multer.File> {
//         if (!file) {
//             throw new ValidationException<VideoPostUserInput>({
//                 fields: { video: ["form.required"] },
//             });
//         }

//         // Читаем только первые MAGIC_BYTES_SIZE байт — не грузим весь файл в память.
//         // Работает с diskStorage: file.path указывает на temp-файл multer.
//         let detected: Awaited<ReturnType<typeof fromBuffer>> | undefined;
//         try {
//             const handle = await fs.open(file.path, "r");
//             try {
//                 const buf = Buffer.alloc(MAGIC_BYTES_SIZE);
//                 const { bytesRead } = await handle.read(
//                     buf,
//                     0,
//                     MAGIC_BYTES_SIZE,
//                     0,
//                 );
//                 detected = await fromBuffer(buf.subarray(0, bytesRead));
//             } finally {
//                 await handle.close();
//             }
//         } catch {
//             // Не смогли прочитать файл — очищаем и отклоняем
//             await fs.unlink(file.path).catch(() => undefined);
//             throw new ValidationException<VideoPostUserInput>({
//                 fields: { video: ["form.video.unreadable"] },
//             });
//         }

//         if (
//             !detected ||
//             !VIDEO_POST_CONFIG.allowedMimeTypes.includes(
//                 detected.mime as AllowedVideoMimeType,
//             )
//         ) {
//             await fs.unlink(file.path).catch(() => undefined);
//             throw new ValidationException<VideoPostUserInput>({
//                 fields: { video: ["form.video.unsupportedType"] },
//             });
//         }

//         // Подменяем mimetype на реальный — не тот что прислал клиент
//         file.mimetype = detected.mime;

//         if (file.size > VIDEO_POST_CONFIG.maxFileSizeBytes) {
//             await fs.unlink(file.path).catch(() => undefined);
//             throw new ValidationException<VideoPostUserInput>({
//                 fields: { video: ["form.video.tooLarge"] },
//             });
//         }

//         return file;
//     }
// }
