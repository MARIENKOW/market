import { ImageValidationConfig, VideoValidationConfig } from "./types";

export const PASSWORD_MIN_LENGTH = 5;
export const PASSWORD_MAX_LENGTH = 30;
export const EMAIL_MAX_LENGTH = 50;
export const CHANGE_PASSWORD_OTP_LENGTH = 5;
export const ALLOWED_IMAGE_MIME_TYPES = [
    // 📸 базовые (must-have)
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",

    // 🆕 современные
    "image/avif",
    "image/heic",
    "image/heif",

    // 🎨 вектор
    "image/svg+xml",

    // 🖼️ bitmap / старые форматы
    "image/bmp",
    "image/x-ms-bmp",
    "image/tiff",

    // 📷 камеры / RAW (иногда приходят)
    "image/x-canon-cr2",
    "image/x-nikon-nef",
    "image/x-sony-arw",

    // 🧪 редкие / экзотика
    "image/x-icon",
    "image/vnd.microsoft.icon",

    // Apple специфичное
    "image/jp2", // JPEG 2000 (Safari любит)

    // старые/альтернативные jpeg
    "image/pjpeg",
];
export const AVATAR_CONFIG: ImageValidationConfig = {
    maxFileSizeBytes: 50 * 1024 * 1024, // 50MB
    allowedMimeTypes: ALLOWED_IMAGE_MIME_TYPES,
};

export const ALLOWED_VIDEO_MIME_TYPES = [
    // 🎬 базовые (must-have)
    "video/mp4", // H.264 / H.265
    "video/webm", // VP8 / VP9 / AV1
    "video/ogg", // Ogg Theora

    // 🆕 современные
    "video/av1", // AV1 (редко напрямую как mime, но пусть будет)
    "video/mp4; codecs=av01", // AV1 в mp4 (иногда приходит так)

    // 🍎 Apple / Safari
    "video/quicktime", // .mov
    "video/mp4v-es", // иногда старые mp4 кодеки

    // 🖥️ старые / legacy
    "video/x-msvideo", // .avi
    "video/x-ms-wmv", // .wmv
    "video/x-flv", // .flv

    // 📦 контейнеры
    "video/x-matroska", // .mkv
    "video/3gpp", // .3gp
    "video/3gpp2", // .3g2

    // 📡 стриминг / HLS / DASH (если вдруг)
    "application/vnd.apple.mpegurl", // .m3u8
    "application/x-mpegURL",
    "video/mp2t", // .ts (HLS сегменты)

    // 🧪 редкие / экзотика
    "video/x-ogm",
];
export const BLOG_VIDEO_CONFIG: VideoValidationConfig = {
    maxFileSizeBytes: 500 * 1024 * 1024, // 500MB
    allowedMimeTypes: ALLOWED_IMAGE_MIME_TYPES,
};