"use client";

import { useState, useRef, useCallback } from "react";
import { Box, Typography, Stack, IconButton, Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useTranslations } from "next-intl";
import * as uuid from "uuid";

import { DropZone } from "@/components/features/form/fields/uncontrolled/DropZone";
import { UploadTrigger } from "@/components/features/Uploader/UploadTrigger";
import { UploadQueue } from "@/components/features/Uploader/UploadQueue";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import {
    UploadItem,
    UploaderProps,
} from "@/components/features/Uploader/types";
import { StyledDrawer } from "@/components/ui/StyledDrawer";
import { StyledTypography } from "@/components/ui/StyledTypography";

const DEFAULT_ACCEPT = ["video/mp4", "video/webm", "video/quicktime"];
const DRAWER_WIDTH = 340;

const isFinished = (s: UploadItem["status"]) =>
    s === "done" || s === "error" || s === "cancelled";

export function VideoUploader<TResult = unknown>({
    uploadFn,
    onSuccess,
    onError,
    accept = DEFAULT_ACCEPT,
}: UploaderProps<TResult>) {
    const t = useTranslations();

    const [open, setOpen] = useState(false);
    const [uploads, setUploads] = useState<UploadItem[]>([]);
    const abortRefs = useRef<Record<string, AbortController>>({});
    const smoothedSpeed = useRef<Record<string, number>>({});

    const patch = useCallback((id: string, data: Partial<UploadItem>) => {
        setUploads((prev) =>
            prev.map((u) => (u.id === id ? { ...u, ...data } : u)),
        );
    }, []);

    const uploadOne = useCallback(
        async (item: UploadItem) => {
            patch(item.id, { status: "uploading" });
            let lastLoaded = 0;
            let lastTime = Date.now();

            try {
                const result = await uploadFn(item.file, {
                    signal: abortRefs.current[item.id]?.signal,
                    onProgress: ({ loaded, total }) => {
                        const now = Date.now();
                        const dt = (now - lastTime) / 1000;
                        if (dt > 0.1) {
                            const instant = (loaded - lastLoaded) / dt;
                            const prev =
                                smoothedSpeed.current[item.id] ?? instant;
                            smoothedSpeed.current[item.id] =
                                0.3 * instant + 0.7 * prev;
                            lastLoaded = loaded;
                            lastTime = now;
                        }
                        patch(item.id, {
                            progress:
                                total > 0
                                    ? Math.min(
                                          Math.round((loaded / total) * 100),
                                          100,
                                      )
                                    : 0,
                            speed: smoothedSpeed.current[item.id] ?? 0,
                        });
                    },
                });
                patch(item.id, { status: "done", progress: 100, speed: 0 });
                delete smoothedSpeed.current[item.id];
                onSuccess?.(result, { ...item, status: "done" });
            } catch (err) {
                const cancelled =
                    (err instanceof Error &&
                        (err.name === "CanceledError" ||
                            err.name === "AbortError")) ||
                    (err as { code?: string })?.code === "ERR_CANCELED" ||
                    abortRefs.current[item.id]?.signal?.aborted;

                patch(item.id, {
                    status: cancelled ? "cancelled" : "error",
                    speed: 0,
                });
                if (!cancelled) onError?.(err, { ...item, status: "error" });
            } finally {
                delete abortRefs.current[item.id];
            }
        },
        [uploadFn, onSuccess, onError, patch],
    );

    const processFiles = useCallback(
        (files: File[]) => {
            if (!files.length) return;
            const items: UploadItem[] = files.map((file) => ({
                id: uuid.v4(),
                file,
                status: "waiting",
                progress: 0,
                speed: 0,
            }));
            items.forEach((item) => {
                abortRefs.current[item.id] = new AbortController();
            });
            setUploads((prev) => [...items, ...prev]);
            void Promise.allSettled(items.map(uploadOne));
        },
        [uploadOne],
    );

    // ── Stats ─────────────────────────────────────────────────────────────────

    const total = uploads.length;
    const done = uploads.filter((u) => u.status === "done").length;
    const errors = uploads.filter((u) => u.status === "error").length;
    const active = uploads.filter((u) => u.status === "uploading");
    const waiting = uploads.filter((u) => u.status === "waiting").length;
    const cancellableCount = uploads.filter(
        (u) => u.status === "waiting" || u.status === "uploading",
    ).length;
    const hasFinished = uploads.some((u) => isFinished(u.status));
    const avgProgress = active.length
        ? Math.round(active.reduce((s, u) => s + u.progress, 0) / active.length)
        : 0;

    const sublabel = `${accept.map((type) => type.split("/")[1]?.toUpperCase()).join(", ")} · ${t("video.uploader.multipleFiles")}`;

    return (
        <>
            <UploadTrigger
                onClick={() => setOpen(true)}
                total={total}
                done={done}
                errors={errors}
                activeCount={active.length}
                waiting={waiting}
                avgProgress={avgProgress}
                triggerLabel={t("video.uploader.trigger")}
            />

            <StyledDrawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: DRAWER_WIDTH,
                            display: "flex",
                            flexDirection: "column",
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        px: 2.5,
                        py: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: 1,
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        flexShrink: 0,
                    }}
                >
                    <Stack direction="row" alignItems="center" gap={1}>
                        <UploadFileIcon
                            sx={{ fontSize: 18, color: "primary.main" }}
                        />
                        <StyledTypography variant="subtitle2" fontWeight={700}>
                            {t("video.uploader.drawerTitle")}
                        </StyledTypography>
                    </Stack>
                    <IconButton
                        size="small"
                        onClick={() => setOpen(false)}
                        sx={{ color: "text.disabled" }}
                    >
                        <CloseIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <DropZone
                        onFiles={processFiles}
                        accept={accept}
                        labelActive={t("video.uploader.dropActive")}
                        labelIdle={t("video.uploader.dropIdle")}
                        sublabel={sublabel}
                    />
                    <UploadQueue
                        uploads={uploads}
                        busy={active.length > 0 || waiting > 0}
                        done={done}
                        total={total}
                        errors={errors}
                        cancellableCount={cancellableCount}
                        hasFinished={hasFinished}
                        fileIcon={(color) => (
                            <VideoFileIcon sx={{ fontSize: 17, color }} />
                        )}
                        onRemove={(id) =>
                            setUploads((prev) =>
                                prev.filter((u) => u.id !== id),
                            )
                        }
                        onCancel={(id) => abortRefs.current[id]?.abort()}
                        onCancelAll={() =>
                            Object.values(abortRefs.current).forEach((c) =>
                                c.abort(),
                            )
                        }
                        onClearFinished={() =>
                            setUploads((prev) =>
                                prev.filter((u) => !isFinished(u.status)),
                            )
                        }
                    />
                </Box>
            </StyledDrawer>
        </>
    );
}
