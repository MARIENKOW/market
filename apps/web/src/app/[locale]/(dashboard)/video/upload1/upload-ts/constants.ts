import type { UploadStatus } from "./types";

export const STATUS = {
    WAITING:   "waiting",
    UPLOADING: "uploading",
    DONE:      "done",
    ERROR:     "error",
    CANCELLED: "cancelled",
} as const satisfies Record<string, UploadStatus>;

export const isCancellable = (s: UploadStatus): boolean =>
    s === STATUS.WAITING || s === STATUS.UPLOADING;

export const isFinished = (s: UploadStatus): boolean =>
    s === STATUS.DONE || s === STATUS.ERROR || s === STATUS.CANCELLED;
