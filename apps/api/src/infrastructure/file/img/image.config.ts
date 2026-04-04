import { ALLOWED_IMAGE_MIME_TYPES } from "@myorg/shared/form";

export type AllowedImageMimeType = (typeof ALLOWED_IMAGE_MIME_TYPES)[number];

// Расширение файла по mimetype — для сохранения оригинала
export const MIME_TO_EXT: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
};
