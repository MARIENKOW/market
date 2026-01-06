// import { z } from "zod";

// // 1. Схема проверки env
// export const EnvSchema = z.object({
//     FOLDER: z.string().default("/uploads"),
//     IMG_FOLDER: z.string().default("/uploads/img"),
//     VIDEO_FOLDER: z.string().default("/uploads/video"),
//     DOCUMENT_FOLDER: z.string().default("/uploads/document"),

//     DB_HOST: z.string(),
//     DB_USER: z.string(),
//     DB_DATABASE: z.string(),
//     DB_PASSWORD: z.string(),
//     DB_CONNECT_TIMEOUT: z.string().transform(Number),
//     DB_PORT: z.string().transform(Number),

//     SMTP_HOST: z.string(),
//     SMTP_PORT: z.string().transform(Number),
//     SMTP_USER: z.string(),
//     SMTP_PASSWORD: z.string(),

//     JWT_ACCESS_SECRET: z.string(),
//     JWT_ACCESS_MINUTES: z.string().transform(Number),
//     JWT_REFRESH_SECRET: z.string(),
//     JWT_REFRESH_DAYS: z.string().transform(Number),

//     TELEGRAM_BOT_TOKEN: z.string(),
//     TELEGRAM_CHAT_ID: z.string(),

//     SERVER_PORT: z.string().transform(Number).default(5000),

//     GOOGLE_CLIENT_ID: z.string(),
//     GOOGLE_CLIENT_SECRET: z.string(),

//     AUTH_SECRET: z.string(),

//     CLIENT_API: z.string(),
//     NEXT_PUBLIC_SERVER_API: z.string(),
// });

// export type EnvType = z.infer<typeof EnvSchema>;
