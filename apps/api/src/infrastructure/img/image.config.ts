import { ALLOWED_MIME_TYPES } from "@myorg/shared/form";
import { ImageEntityType } from "@/generated/prisma";
import { ImageEntityConfig } from "@/infrastructure/img/image.types";

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

// Расширение файла по mimetype — для сохранения оригинала
export const MIME_TO_EXT: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
};

// Корень хранилища
export const UPLOADS_IMAGE_ROOT = "uploads/image";

export const IMAGE_ENTITY_CONFIG: Record<ImageEntityType, ImageEntityConfig> = {
    [ImageEntityType.AVATAR]: { folder: "avatars" },
};

export const IMAGE_ENTITY_PUBLIC: ImageEntityConfig[] = [
    IMAGE_ENTITY_CONFIG.AVATAR,
];
