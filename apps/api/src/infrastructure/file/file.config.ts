import { FileEntityType } from "@/generated/prisma";
import { FileEntityConfig } from "./file.types";
import path from "path";

export const UPLOADS_ROOT = "uploads";
export const UPLOADS_BASE_PATH = path.resolve(process.cwd(), UPLOADS_ROOT);

export const FILE_CONFIG: Record<FileEntityType, FileEntityConfig> = {
    [FileEntityType.AVATAR]: { folder: "avatars", private: false },
    [FileEntityType.BLOG_UPLOAD_IMAGE]: {
        folder: "blog/upload/image",
        private: true,
    },
    [FileEntityType.BLOG_UPLOAD_VIDEO]: {
        folder: "blog/upload/video",
        private: true,
    },
    [FileEntityType.BLOG_IN_IMAGE]: { folder: "blog/in/image", private: false },
    [FileEntityType.BLOG_IN_VIDEO]: { folder: "blog/in/video", private: false },
};

export const FILE_PUBLIC: FileEntityConfig[] = Object.entries(FILE_CONFIG)
    .map((e) => e[1])
    .filter((e) => !e.private);
