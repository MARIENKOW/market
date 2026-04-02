import { env } from "@/config";
import { Image } from "@/generated/prisma";
import { FILE_CONFIG, UPLOADS_ROOT } from "@/infrastructure/file/file.config";
import { signPath } from "@/infrastructure/file/file-sign.utils";
import { ImageDto } from "@myorg/shared/dto";

export const mapImage = (image: Image): ImageDto => {
    const config = FILE_CONFIG[image.entityType];

    const base = env.NEXT_PUBLIC_API_ORIGIN_CLIENT.replace(/\/$/, "");
    const prefix = env.NEXT_PUBLIC_API_GLOBAL_PREFIX.replace(/^\//, "");
    const relative = `${config.folder}/${image.filename}`;
    const url = `${base}/${prefix}/${UPLOADS_ROOT}/${config.private ? signPath(relative) : relative}`;

    return {
        id: image.id,
        url,
        mimeType: image.mimeType,
        width: image.width,
        height: image.height,
        size: image.size,
        createdAt: image.createdAt.toISOString(),
    };
};
