"use client";

import { useState, useRef, useCallback } from "react";
import {
    Box,
    Typography,
    Stack,
    Paper,
    LinearProgress,
    CircularProgress,
    IconButton,
    Chip,
    Drawer,
    Tooltip,
    Button,
    useTheme,
    alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CancelIcon from "@mui/icons-material/Cancel";
import BlockIcon from "@mui/icons-material/Block";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { formatBytes } from "@myorg/shared/utils";
import * as uuid from "uuid";

// ─── Типы ─────────────────────────────────────────────────────────────────────

type UploadStatus = "waiting" | "uploading" | "done" | "error" | "cancelled";

interface UploadItem {
    id: string;
    file: File;
    status: UploadStatus;
    progress: number;
    speed: number;
}

export interface UploadProgressEvent {
    loaded: number;
    total: number;
}

export type UploadFn<TResult = unknown> = (
    file: File,
    options: {
        signal: AbortSignal;
        onProgress: (event: UploadProgressEvent) => void;
    },
) => Promise<TResult>;

export interface VideoUploaderProps<TResult = unknown> {
    uploadFn: UploadFn<TResult>;
    onSuccess?: (result: TResult, item: UploadItem) => void;
    onError?: (error: unknown, item: UploadItem) => void;
    accept?: string[];
}

// ─── Константы ────────────────────────────────────────────────────────────────

const DEFAULT_ACCEPT = ["video/mp4", "video/webm", "video/quicktime"];
const DRAWER_WIDTH = 340;

const isCancellable = (s: UploadStatus) => s === "waiting" || s === "uploading";
const isFinished = (s: UploadStatus) =>
    s === "done" || s === "error" || s === "cancelled";

// ─── Компонент ────────────────────────────────────────────────────────────────

export function VideoUploader<TResult = unknown>({
    uploadFn,
    onSuccess,
    onError,
    accept = DEFAULT_ACCEPT,
}: VideoUploaderProps<TResult>) {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [uploads, setUploads] = useState<UploadItem[]>([]);
    const abortRefs = useRef<Record<string, AbortController>>({});
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    // ── Хелпер: точечное обновление item ─────────────────────────────────────

    const patch = useCallback((id: string, data: Partial<UploadItem>) => {
        setUploads((prev) =>
            prev.map((u) => (u.id === id ? { ...u, ...data } : u)),
        );
    }, []);

    // ── Загрузка одного файла ─────────────────────────────────────────────────

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
                        const speed =
                            dt > 0.1 ? (loaded - lastLoaded) / dt : undefined;
                        lastLoaded = loaded;
                        lastTime = now;
                        patch(item.id, {
                            progress:
                                total > 0
                                    ? Math.min(
                                          Math.round((loaded / total) * 100),
                                          100,
                                      )
                                    : 0,
                            ...(speed !== undefined ? { speed } : {}),
                        });
                    },
                });

                patch(item.id, { status: "done", progress: 100, speed: 0 });
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

    // ── Принять файлы ─────────────────────────────────────────────────────────

    const processFiles = useCallback(
        (files: File[]) => {
            if (!files.length) return;

            const filtered = files.filter((f) =>
                accept.some((t) =>
                    t.endsWith("/*")
                        ? f.type.startsWith(t.replace("/*", "/"))
                        : f.type === t,
                ),
            );
            if (!filtered.length) return;

            const items: UploadItem[] = filtered.map((file) => ({
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
        [accept, uploadOne],
    );

    // ── Сводная статистика для кнопки-триггера ────────────────────────────────

    const total = uploads.length;
    const done = uploads.filter((u) => u.status === "done").length;
    const errors = uploads.filter((u) => u.status === "error").length;
    const active = uploads.filter((u) => u.status === "uploading");
    const waiting = uploads.filter((u) => u.status === "waiting").length;
    const busy = active.length > 0 || waiting > 0;
    const cancellableCount = uploads.filter((u) =>
        isCancellable(u.status),
    ).length;
    const hasFinished = uploads.some((u) => isFinished(u.status));
    const avgProgress = active.length
        ? Math.round(active.reduce((s, u) => s + u.progress, 0) / active.length)
        : 0;

    // ─── Trigger button ───────────────────────────────────────────────────────

    const allDone = total > 0 && done === total && errors === 0;
    const hasError = errors > 0 && !busy;
    const tone = allDone ? "success" : hasError ? "error" : "info";
    const c = theme.palette[tone];

    const TriggerButton =
        total === 0 ? (
            <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={() => setOpen(true)}
                sx={{ borderRadius: 2, fontWeight: 600, px: 2.5 }}
            >
                Загрузить видео
            </Button>
        ) : (
            <Tooltip title="Открыть очередь загрузки" placement="bottom">
                <Paper
                    variant="outlined"
                    onClick={() => setOpen(true)}
                    sx={{
                        px: 1.5,
                        py: 0.75,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: "pointer",
                        borderRadius: 2,
                        borderColor: alpha(c.main, 0.3),
                        bgcolor: alpha(c.main, 0.07),
                        userSelect: "none",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            borderColor: c.main,
                            bgcolor: alpha(c.main, 0.13),
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: 30,
                            height: 30,
                            borderRadius: 1,
                            flexShrink: 0,
                            bgcolor: alpha(c.main, 0.12),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {busy ? (
                            <CircularProgress
                                size={14}
                                sx={{ color: c.main }}
                            />
                        ) : allDone ? (
                            <CheckCircleIcon
                                sx={{ fontSize: 16, color: "success.main" }}
                            />
                        ) : (
                            <ErrorIcon
                                sx={{ fontSize: 16, color: "error.main" }}
                            />
                        )}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant="caption"
                            fontWeight={700}
                            color={`${tone}.main`}
                            display="block"
                            lineHeight={1.3}
                            noWrap
                        >
                            {busy
                                ? `Загружается ${active.length} из ${total}`
                                : allDone
                                  ? `Готово · ${done}`
                                  : `${done} из ${total} · ${errors} ошибок`}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.disabled"
                            display="block"
                            lineHeight={1.3}
                            noWrap
                        >
                            {busy
                                ? `~${avgProgress}% · осталось ${waiting} в очереди`
                                : "нажмите, чтобы открыть"}
                        </Typography>
                    </Box>
                    {busy && (
                        <Box sx={{ width: 44, flexShrink: 0 }}>
                            <LinearProgress
                                variant="determinate"
                                value={(done / total) * 100}
                                color={tone}
                                sx={{
                                    height: 3,
                                    borderRadius: 99,
                                    bgcolor: alpha(c.main, 0.15),
                                    "& .MuiLinearProgress-bar": {
                                        borderRadius: 99,
                                    },
                                }}
                            />
                        </Box>
                    )}
                </Paper>
            </Tooltip>
        );

    // ─── Drawer ───────────────────────────────────────────────────────────────

    return (
        <>
            {TriggerButton}

            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        width: DRAWER_WIDTH,
                        bgcolor: "background.default",
                        backgroundImage: "none",
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
            >
                {/* Header */}
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
                        <Typography variant="subtitle2" fontWeight={700}>
                            Загрузка видео
                        </Typography>
                    </Stack>
                    <IconButton
                        size="small"
                        onClick={() => setOpen(false)}
                        sx={{ color: "text.disabled" }}
                    >
                        <CloseIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>

                {/* Body */}
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
                    {/* DropZone */}
                    <Paper
                        variant="outlined"
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setDragging(false);
                            processFiles(Array.from(e.dataTransfer.files));
                        }}
                        onClick={() => inputRef.current?.click()}
                        sx={{
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1.5,
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderColor: dragging ? "primary.main" : "divider",
                            bgcolor: dragging
                                ? alpha(theme.palette.primary.main, 0.05)
                                : "background.paper",
                            transform: dragging ? "scale(1.01)" : "scale(1)",
                            transition: "all 0.2s ease",
                            boxShadow: dragging
                                ? `0 0 20px ${alpha(theme.palette.primary.main, 0.12)}`
                                : "none",
                            "&:hover": {
                                borderColor: "primary.light",
                                bgcolor: alpha(
                                    theme.palette.primary.main,
                                    0.03,
                                ),
                            },
                        }}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            accept={accept.join(",")}
                            multiple
                            style={{ display: "none" }}
                            onChange={(e) => {
                                processFiles(Array.from(e.target.files ?? []));
                                e.target.value = "";
                            }}
                        />
                        <Box
                            sx={{
                                width: 52,
                                height: 52,
                                borderRadius: 2,
                                bgcolor: dragging
                                    ? alpha(theme.palette.primary.main, 0.1)
                                    : alpha(theme.palette.action.active, 0.04),
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <CloudUploadIcon
                                sx={{
                                    fontSize: 26,
                                    color: dragging
                                        ? "primary.main"
                                        : "text.disabled",
                                    transition: "color 0.2s",
                                }}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Typography
                                variant="body2"
                                color={dragging ? "primary" : "text.secondary"}
                                fontWeight={500}
                            >
                                {dragging
                                    ? "Отпустите для загрузки"
                                    : "Перетащите видео или нажмите"}
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                                {accept
                                    .map((t) => t.split("/")[1]?.toUpperCase())
                                    .join(", ")}{" "}
                                · несколько файлов
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Общий прогресс */}
                    {busy && total > 0 && (
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 1.5,
                                borderColor: alpha(
                                    theme.palette.info.main,
                                    0.3,
                                ),
                                bgcolor: alpha(theme.palette.info.main, 0.05),
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={1}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={0.75}
                                >
                                    <CircularProgress size={12} color="info" />
                                    <Typography
                                        variant="caption"
                                        color="info.main"
                                        fontWeight={600}
                                    >
                                        Загрузка…
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={1}
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.disabled"
                                    >
                                        {done} / {total}
                                    </Typography>
                                    {cancellableCount > 1 && (
                                        <Tooltip
                                            title={`Отменить все (${cancellableCount})`}
                                            placement="left"
                                        >
                                            <Chip
                                                label="Отменить все"
                                                size="small"
                                                color="error"
                                                variant="outlined"
                                                icon={
                                                    <CancelIcon
                                                        sx={{
                                                            fontSize:
                                                                "12px !important",
                                                        }}
                                                    />
                                                }
                                                onClick={() =>
                                                    Object.values(
                                                        abortRefs.current,
                                                    ).forEach((c) => c.abort())
                                                }
                                                sx={{
                                                    height: 20,
                                                    fontSize: 10,
                                                    cursor: "pointer",
                                                    "& .MuiChip-label": {
                                                        px: "6px",
                                                    },
                                                    "& .MuiChip-icon": {
                                                        ml: "4px",
                                                    },
                                                }}
                                            />
                                        </Tooltip>
                                    )}
                                </Stack>
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                value={(done / total) * 100}
                                color="info"
                                sx={{
                                    height: 3,
                                    borderRadius: 99,
                                    "& .MuiLinearProgress-bar": {
                                        borderRadius: 99,
                                    },
                                }}
                            />
                        </Paper>
                    )}

                    {/* Список */}
                    {total > 0 && (
                        <Box>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={1}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={0.75}
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.disabled"
                                        sx={{
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                        }}
                                    >
                                        Очередь ({total})
                                    </Typography>
                                    {errors > 0 && (
                                        <Chip
                                            label={`${errors} ошибок`}
                                            size="small"
                                            color="error"
                                            sx={{
                                                height: 16,
                                                fontSize: 9,
                                                "& .MuiChip-label": {
                                                    px: "5px",
                                                },
                                            }}
                                        />
                                    )}
                                </Stack>
                                {!busy && hasFinished && (
                                    <Typography
                                        variant="caption"
                                        color="text.disabled"
                                        onClick={() =>
                                            setUploads((prev) =>
                                                prev.filter(
                                                    (u) =>
                                                        !isFinished(u.status),
                                                ),
                                            )
                                        }
                                        sx={{
                                            cursor: "pointer",
                                            userSelect: "none",
                                            "&:hover": {
                                                color: "text.secondary",
                                            },
                                            transition: "color 0.2s",
                                        }}
                                    >
                                        очистить
                                    </Typography>
                                )}
                            </Stack>

                            <Stack spacing={1}>
                                {uploads.map((item) => (
                                    <UploadItemRow
                                        key={item.id}
                                        item={item}
                                        onRemove={(id) =>
                                            setUploads((prev) =>
                                                prev.filter((u) => u.id !== id),
                                            )
                                        }
                                        onCancel={(id) =>
                                            abortRefs.current[id]?.abort()
                                        }
                                    />
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Box>
            </Drawer>
        </>
    );
}

// ─── UploadItemRow ────────────────────────────────────────────────────────────

function UploadItemRow({
    item,
    onRemove,
    onCancel,
}: {
    item: UploadItem;
    onRemove: (id: string) => void;
    onCancel: (id: string) => void;
}) {
    const theme = useTheme();

    const cfgMap: Record<
        UploadStatus,
        {
            color: string;
            icon: React.ReactNode;
            label: string;
            chip: "default" | "info" | "success" | "error";
            bar: "inherit" | "info" | "success" | "error";
        }
    > = {
        waiting: {
            color: theme.palette.text.disabled,
            icon: <HourglassTopIcon sx={{ fontSize: 14 }} />,
            label: "В очереди",
            chip: "default",
            bar: "inherit",
        },
        uploading: {
            color: theme.palette.info.main,
            icon: (
                <CircularProgress
                    size={10}
                    sx={{ color: theme.palette.info.main }}
                />
            ),
            label: `${item.progress}%`,
            chip: "info",
            bar: "info",
        },
        done: {
            color: theme.palette.success.main,
            icon: <CheckCircleIcon sx={{ fontSize: 14 }} />,
            label: "Готово",
            chip: "success",
            bar: "success",
        },
        error: {
            color: theme.palette.error.main,
            icon: <ErrorIcon sx={{ fontSize: 14 }} />,
            label: "Ошибка",
            chip: "error",
            bar: "error",
        },
        cancelled: {
            color: theme.palette.text.disabled,
            icon: <BlockIcon sx={{ fontSize: 14 }} />,
            label: "Отменено",
            chip: "default",
            bar: "inherit",
        },
    };

    const cfg = cfgMap[item.status];

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                borderColor: alpha(cfg.color, 0.25),
                bgcolor: alpha(cfg.color, 0.04),
                opacity: item.status === "cancelled" ? 0.55 : 1,
                transition:
                    "border-color 0.25s, background-color 0.25s, opacity 0.25s",
                animation: "slideIn 0.25s ease",
                "@keyframes slideIn": {
                    from: { opacity: 0, transform: "translateY(-6px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
            }}
        >
            <Box
                sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 1,
                    flexShrink: 0,
                    bgcolor: alpha(cfg.color, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <VideoFileIcon sx={{ fontSize: 17, color: cfg.color }} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={0.5}
                >
                    <Typography
                        variant="caption"
                        noWrap
                        sx={{
                            color: "text.primary",
                            fontWeight: 500,
                            maxWidth: "58%",
                            display: "block",
                        }}
                    >
                        {item.file.name}
                    </Typography>
                    <Chip
                        size="small"
                        color={cfg.chip}
                        icon={<div>{cfg.icon}</div>}
                        label={cfg.label}
                        sx={{
                            height: 20,
                            fontSize: 10,
                            fontWeight: 600,
                            "& .MuiChip-icon": { fontSize: 12, ml: "4px" },
                            "& .MuiChip-label": { px: "6px" },
                        }}
                    />
                </Stack>

                <LinearProgress
                    variant="determinate"
                    value={
                        item.status === "done" || item.status === "error"
                            ? 100
                            : item.progress
                    }
                    color={cfg.bar}
                    sx={{
                        height: 3,
                        borderRadius: 99,
                        bgcolor: alpha(cfg.color, 0.1),
                        "& .MuiLinearProgress-bar": {
                            borderRadius: 99,
                            boxShadow:
                                item.status === "uploading"
                                    ? `0 0 6px ${alpha(cfg.color, 0.5)}`
                                    : "none",
                        },
                    }}
                />

                <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ display: "block", mt: 0.25 }}
                >
                    {formatBytes(item.file.size)}
                    {item.status === "uploading" && item.speed > 0
                        ? ` · ${formatBytes(item.speed)}/s`
                        : ""}
                </Typography>
            </Box>

            {isCancellable(item.status) && (
                <Tooltip title="Отменить" placement="left">
                    <IconButton
                        size="small"
                        onClick={() => onCancel(item.id)}
                        sx={{
                            flexShrink: 0,
                            color: "text.disabled",
                            "&:hover": { color: "error.main" },
                            transition: "color 0.2s",
                        }}
                    >
                        <CancelIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Tooltip>
            )}

            {isFinished(item.status) && (
                <IconButton
                    size="small"
                    onClick={() => onRemove(item.id)}
                    sx={{
                        flexShrink: 0,
                        color: "text.disabled",
                        "&:hover": { color: "text.secondary" },
                    }}
                >
                    <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
            )}
        </Paper>
    );
}
