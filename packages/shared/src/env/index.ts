import { z } from "zod";

const boolStr = z.enum(["true", "false"]).transform((v) => v === "true");
const csvString = z.string().transform((v) =>
    v
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
);

/** Только серверные — НИКОГДА не импортировать в клиентские компоненты */
export const serverEnvSchema = z
    .object({
        NODE_ENV: z
            .enum(["development", "production", "test"])
            .default("development"),

        // Folders
        FOLDER: z.string().startsWith("/"),
        IMG_FOLDER: z.string().startsWith("/"),
        VIDEO_FOLDER: z.string().startsWith("/"),
        DOCUMENT_FOLDER: z.string().startsWith("/"),

        // Database
        DB_HOST: z.string().min(1),
        DB_USER: z.string().min(1),
        DB_DATABASE: z.string().min(1),
        DB_PASSWORD: z.string().default(""),
        DB_PORT: z.coerce.number().int().positive().default(5432),
        DB_CONNECT_TIMEOUT: z.coerce.number().int().positive().default(30000),
        DB_PROVIDER: z
            .enum(["postgresql", "mysql", "sqlite"])
            .default("postgresql"),

        // SMTP
        SMTP_HOST: z.string().min(1),
        SMTP_PORT: z.coerce.number().int().positive().default(465),
        SMTP_USER: z.string().email(),
        SMTP_PASSWORD: z.string().min(1),

        // JWT
        JWT_ACCESS_SECRET: z.string().min(16),
        JWT_REFRESH_SECRET: z.string().min(16),
        JWT_SECRET: z.string().min(16),

        // Telegram
        TELEGRAM_BOT_TOKEN: z
            .string()
            .regex(/^\d+:[A-Za-z0-9_-]+$/, "Невалидный BOT_TOKEN"),
        TELEGRAM_CHAT_ID: z.string().min(1),

        // Google OAuth
        GOOGLE_CLIENT_ID: z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),

        // Misc
        SSL: boolStr.default(false),
        ALLOWED_ORIGIN: csvString,
    })
    .transform((data) => ({
        ...data,
        DB_URL: `${data.DB_PROVIDER}://${data.DB_USER}:${data.DB_PASSWORD}@${data.DB_HOST}:${data.DB_PORT}/${data.DB_DATABASE}`,
    }));

/** Только NEXT_PUBLIC_ — безопасно импортировать где угодно, в том числе на клиенте */
export const clientEnvSchema = z.object({
    NEXT_PUBLIC_SERVER_PORT: z.coerce.number().int().positive().default(8000),
    NEXT_PUBLIC_GLOBAL_PREFIX: z.string().default("api"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;
