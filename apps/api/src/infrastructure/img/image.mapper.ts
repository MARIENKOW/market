import { env } from "@/config";
import { Image } from "@/generated/prisma";
import { IMAGE_ENTITY_CONFIG, UPLOADS_IMAGE_ROOT } from "@/infrastructure/img/image.config";
import { ImageDto } from "@myorg/shared/dto";

export const mapImage = (image: Image): ImageDto => {
    const config = IMAGE_ENTITY_CONFIG[image.entityType];

    const base = env.NEXT_PUBLIC_API_ORIGIN_CLIENT.replace(/\/$/, "");
    const prefix = env.NEXT_PUBLIC_API_GLOBAL_PREFIX.replace(/^\//, "");
    const url = `${base}/${prefix}/${UPLOADS_IMAGE_ROOT}/${config.folder}/${image.filename}`;

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
