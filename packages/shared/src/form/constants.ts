import { ImageValidationConfig } from "./types";

export const PASSWORD_MIN_LENGTH = 5;
export const PASSWORD_MAX_LENGTH = 30;
export const EMAIL_MAX_LENGTH = 50;
export const CHANGE_PASSWORD_OTP_LENGTH = 5;
export const ALLOWED_MIME_TYPES = [
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
    maxFileSizeBytes: 50 * 1024 * 1024, // 10MB
    allowedMimeTypes: ALLOWED_MIME_TYPES,
};
