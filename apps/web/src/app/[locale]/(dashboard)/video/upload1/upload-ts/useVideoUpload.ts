import { useState, useRef, useCallback } from "react";
import { STATUS } from "./constants";
import type { UploadItemState, UseVideoUploadOptions } from "./types";

export function useVideoUpload<TResult = unknown>({
    uploadFn,
    onSuccess,
    onError,
}: UseVideoUploadOptions<TResult>) {
    const [uploads, setUploads] = useState<UploadItemState[]>([]);
    const abortControllersRef = useRef<Record<string, AbortController>>({});

    // ── Хелпер: обновить один item по id ─────────────────────────────────────
    const patchUpload = useCallback(
        (id: string, patch: Partial<UploadItemState>) => {
            setUploads((prev) =>
                prev.map((u) => (u.id === id ? { ...u, ...patch } : u)),
            );
        },
        [],
    );

    // ── Загрузка одного файла ─────────────────────────────────────────────────
    const uploadOne = useCallback(
        async (item: UploadItemState) => {
            patchUpload(item.id, { status: STATUS.UPLOADING });

            const signal = abortControllersRef.current[item.id]?.signal;

            // Для вычисления скорости храним предыдущие значения
            let lastLoaded = 0;
            let lastTime   = Date.now();

            try {
                const result = await uploadFn(item.file, {
                    signal,
                    onProgress: ({ loaded, total }) => {
                        const now = Date.now();
                        const dt  = (now - lastTime) / 1000;

                        // Защита от деления на ноль и от первого чанка
                        // когда dt ≈ 0 — пропускаем обновление скорости
                        const speed =
                            dt > 0.1 ? (loaded - lastLoaded) / dt : undefined;

                        lastLoaded = loaded;
                        lastTime   = now;

                        const progress = total > 0
                            ? Math.min(Math.round((loaded / total) * 100), 100)
                            : 0;

                        patchUpload(item.id, {
                            progress,
                            ...(speed !== undefined ? { speed } : {}),
                        });
                    },
                });

                patchUpload(item.id, {
                    status:   STATUS.DONE,
                    progress: 100,
                    speed:    0,
                });

                // Сообщаем результат наружу — что с ним делать решаешь ты
                onSuccess?.(result, { ...item, status: STATUS.DONE });

            } catch (err) {
                const isCancelled =
                    (err instanceof Error &&
                        (err.name === "CanceledError" || err.name === "AbortError")) ||
                    (err as { code?: string })?.code === "ERR_CANCELED" ||
                    abortControllersRef.current[item.id]?.signal?.aborted;

                patchUpload(item.id, {
                    status: isCancelled ? STATUS.CANCELLED : STATUS.ERROR,
                    speed:  0,
                });

                if (!isCancelled) {
                    onError?.(err, { ...item, status: STATUS.ERROR });
                }
            } finally {
                delete abortControllersRef.current[item.id];
            }
        },
        [uploadFn, onSuccess, onError, patchUpload],
    );

    // ── Принять новые файлы и запустить загрузку ──────────────────────────────
    const processFiles = useCallback(
        (files: File[]) => {
            if (files.length === 0) return;

            const newItems: UploadItemState[] = files.map((file) => ({
                // id:       crypto.randomUUID(),
                id:       Math.random().toString(36).slice(2) + Date.now().toString(36),
                file,
                status:   STATUS.WAITING, // WAITING, не UPLOADING — uploadOne сам переключит
                progress: 0,
                speed:    0,
            }));

            newItems.forEach((item) => {
                abortControllersRef.current[item.id] = new AbortController();
            });

            setUploads((prev) => [...newItems, ...prev]);

            // Запускаем параллельно — Promise.allSettled не бросает
            void Promise.allSettled(newItems.map((item) => uploadOne(item)));
        },
        [uploadOne],
    );

    const cancelUpload = useCallback((id: string) => {
        abortControllersRef.current[id]?.abort();
    }, []);

    const cancelAll = useCallback(() => {
        Object.values(abortControllersRef.current).forEach((ctrl) => ctrl.abort());
    }, []);

    const removeUpload = useCallback((id: string) => {
        setUploads((prev) => prev.filter((u) => u.id !== id));
    }, []);

    const clearFinished = useCallback(() => {
        setUploads((prev) =>
            prev.filter(
                (u) => u.status === STATUS.WAITING || u.status === STATUS.UPLOADING,
            ),
        );
    }, []);

    return {
        uploads,
        processFiles,
        removeUpload,
        clearFinished,
        cancelUpload,
        cancelAll,
    };
}
