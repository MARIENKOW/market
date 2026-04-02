import { env } from "@/config";
import { FILE_CONFIG, UPLOADS_ROOT } from "@/infrastructure/file/file.config";
import { signPath } from "@/infrastructure/file/file-sign.utils";
import { mapImage } from "@/infrastructure/file/img/image.mapper";
import { VideoWithImage } from "@/infrastructure/file/video/video.types";
import { VideoDto } from "@myorg/shared/dto";

export const mapVideo = (video: VideoWithImage): VideoDto => {
    const config = FILE_CONFIG[video.entityType];

    const base = env.NEXT_PUBLIC_API_ORIGIN_CLIENT.replace(/\/$/, "");
    const prefix = env.NEXT_PUBLIC_API_GLOBAL_PREFIX.replace(/^\//, "");
    const relative = `${config.folder}/${video.filename}`;
    const url = `${base}/${prefix}/${UPLOADS_ROOT}/${config.private ? signPath(relative) : relative}`;

    return {
        id: video.id,
        url,
        mimeType: video.mimeType,
        width: video.width,
        height: video.height,
        duration: video.duration,
        size: video.size,
        image: video.image ? mapImage(video.image) : null,
        createdAt: video.createdAt.toISOString(),
    };
};
