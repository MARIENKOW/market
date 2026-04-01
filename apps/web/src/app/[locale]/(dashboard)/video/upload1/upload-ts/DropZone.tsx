import { useRef, useState, useCallback } from "react";
import { Box, Typography, Paper, useTheme, alpha } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface DropZoneProps {
    onFiles: (files: File[]) => void;
    /** Принимаемые mime-типы. Default: ["video/mp4","video/webm","video/quicktime"] */
    accept?: string[];
    disabled?: boolean;
}

const DEFAULT_ACCEPT = ["video/mp4", "video/webm", "video/quicktime"];

export function DropZone({
    onFiles,
    accept = DEFAULT_ACCEPT,
    disabled = false,
}: DropZoneProps) {
    const theme    = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const filterFiles = useCallback(
        (files: File[]): File[] =>
            files.filter((f) =>
                accept.some((type) =>
                    // поддерживаем и точный mime ("video/mp4") и wildcard ("video/*")
                    type.endsWith("/*")
                        ? f.type.startsWith(type.replace("/*", "/"))
                        : f.type === type,
                ),
            ),
        [accept],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragging(false);
            if (disabled) return;

            const files = filterFiles(Array.from(e.dataTransfer.files));
            if (files.length) onFiles(files);
        },
        [disabled, filterFiles, onFiles],
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = filterFiles(Array.from(e.target.files ?? []));
            if (files.length) onFiles(files);
            // сброс value — иначе повторный выбор того же файла не сработает
            e.target.value = "";
        },
        [filterFiles, onFiles],
    );

    return (
        <Paper
            variant="outlined"
            onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => !disabled && inputRef.current?.click()}
            sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                cursor: disabled ? "not-allowed" : "pointer",
                borderStyle: "dashed",
                borderColor: dragging ? "primary.main" : "divider",
                bgcolor: dragging
                    ? alpha(theme.palette.primary.main, 0.05)
                    : "background.paper",
                opacity: disabled ? 0.5 : 1,
                transform: dragging ? "scale(1.01)" : "scale(1)",
                transition: "all 0.2s ease",
                boxShadow: dragging
                    ? `0 0 20px ${alpha(theme.palette.primary.main, 0.12)}`
                    : "none",
                "&:hover": !disabled
                    ? {
                          borderColor: "primary.light",
                          bgcolor: alpha(theme.palette.primary.main, 0.03),
                      }
                    : undefined,
            }}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept.join(",")}
                multiple
                disabled={disabled}
                style={{ display: "none" }}
                onChange={handleChange}
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
                        color: dragging ? "primary.main" : "text.disabled",
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
                    {dragging ? "Отпустите для загрузки" : "Перетащите видео или нажмите"}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                    {accept.map((t) => t.split("/")[1]?.toUpperCase()).join(", ")} · несколько файлов
                </Typography>
            </Box>
        </Paper>
    );
}
