// ─── Статусы ──────────────────────────────────────────────────────────────────

export type UploadStatus =
    | "waiting"
    | "uploading"
    | "done"
    | "error"
    | "cancelled";

// ─── Состояние одного файла в очереди ─────────────────────────────────────────

export interface UploadItemState {
    id: string;
    file: File;
    status: UploadStatus;
    /** 0–100 */
    progress: number;
    /** байт/сек */
    speed: number;
}

// ─── Функция загрузки — передаётся снаружи ────────────────────────────────────

export interface UploadProgressEvent {
    loaded: number;
    total: number;
}

/**
 * Функция которую ты реализуешь сам и передаёшь в хук.
 * Получает файл + контроль (signal, прогресс), возвращает результат.
 *
 * Пример:
 *   const uploadFn: UploadFn<VideoDto> = async (file, { signal, onProgress }) => {
 *       const formData = new FormData();
 *       formData.append("video", file);
 *       return apiClient.post("/uploads/video", formData, { signal, onUploadProgress: onProgress });
 *   };
 */
export type UploadFn<TResult = unknown> = (
    file: File,
    options: {
        signal: AbortSignal;
        onProgress: (event: UploadProgressEvent) => void;
    },
) => Promise<TResult>;

// ─── Опции хука ───────────────────────────────────────────────────────────────

export interface UseVideoUploadOptions<TResult = unknown> {
    /** Твоя функция отправки файла на сервер */
    uploadFn: UploadFn<TResult>;
    /**
     * Вызывается после успешной загрузки каждого файла.
     * Здесь делай всё что нужно: инвалидируй кеш, добавь в форму, показывай снэкбар.
     */
    onSuccess?: (result: TResult, item: UploadItemState) => void;
    /**
     * Вызывается при ошибке (не при отмене).
     */
    onError?: (error: unknown, item: UploadItemState) => void;
}
