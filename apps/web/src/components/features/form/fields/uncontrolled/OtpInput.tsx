"use client";

import {
    useRef,
    useEffect,
    useCallback,
    KeyboardEvent,
    ClipboardEvent,
    CompositionEvent,
} from "react";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import { StyledTextField } from "@/components/ui/StyledTextField";

interface Props {
    value: string;
    onChange: (value: string) => void;
    /** Вызывается когда все ячейки заполнены */
    onComplete?: (value: string) => void;
    error?: boolean;
    disabled?: boolean;
    length?: number;
    autoFocus?: boolean;
    sx?: SxProps<Theme>;
}

export default function OtpInput({
    value,
    onChange,
    onComplete,
    error,
    disabled,
    length = 6,
    autoFocus = false,
    sx,
}: Props) {
    const theme = useTheme();
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const isComposingRef = useRef(false);
    // Тайминг вместо boolean — защита от гонки keyDown/onInput на Android WebView
    const backspaceHandledAtRef = useRef<number>(0);

    // Защита от value длиннее length
    const safeValue = value.slice(0, length);
    const digits = Array.from({ length }, (_, i) => safeValue[i] ?? "");

    // ── Утилита фокуса ────────────────────────────────────────────────────────
    const focus = useCallback(
        (idx: number) => {
            const clamped = Math.max(0, Math.min(idx, length - 1));
            const el = inputsRef.current[clamped];
            if (!el) return;
            el.focus();
            // iOS Safari: select() без setTimeout игнорируется
            setTimeout(() => el.select(), 0);
        },
        [length],
    );

    // ── Автофокус — реагирует на autoFocus и value (напр. SMS autofill) ───────
    useEffect(() => {
        if (!autoFocus) return;
        const firstEmpty = digits.findIndex((d) => !d);
        focus(firstEmpty === -1 ? length - 1 : firstEmpty);
    }, [autoFocus, value]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Emit ──────────────────────────────────────────────────────────────────
    const emit = useCallback(
        (next: string[]) => {
            const val = next.join("");
            if (val === safeValue) return;
            onChange(val);
            if (next.every(Boolean)) {
                // setTimeout — React успевает обновить UI до колбэка
                setTimeout(() => {
                    inputsRef.current[length - 1]?.blur();
                    onComplete?.(val);
                }, 0);
            }
        },
        [onChange, onComplete, safeValue, length],
    );

    // ── onChange ──────────────────────────────────────────────────────────────
    const handleChange = useCallback(
        (idx: number, raw: string) => {
            // Если пришло больше 1 символа — это paste, обрабатывает handlePaste
            if (raw.length > 1) return;

            const char = raw.replace(/\D/g, "").slice(-1);
            const next = [...digits];

            if (!char) {
                // Явно очищаем ячейку если символ не цифра
                next[idx] = "";
                emit(next);
                return;
            }

            next[idx] = char;
            emit(next);
            if (idx < length - 1) focus(idx + 1);
        },
        [digits, emit, focus, length],
    );

    // ── onKeyDown ─────────────────────────────────────────────────────────────
    const handleKeyDown = useCallback(
        (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
            if (isComposingRef.current) return;

            switch (e.key) {
                case "Backspace": {
                    e.preventDefault();
                    backspaceHandledAtRef.current = Date.now();
                    const next = [...digits];
                    if (next[idx]) {
                        next[idx] = "";
                        emit(next);
                    } else if (idx > 0) {
                        next[idx - 1] = "";
                        emit(next);
                        focus(idx - 1);
                    }
                    break;
                }
                case "Delete": {
                    e.preventDefault();
                    const next = [...digits];
                    next[idx] = "";
                    emit(next);
                    break;
                }
                case "ArrowLeft":
                    e.preventDefault();
                    focus(idx - 1);
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    focus(idx + 1);
                    break;
                case "Home":
                    e.preventDefault();
                    focus(0);
                    break;
                case "End":
                    e.preventDefault();
                    focus(length - 1);
                    break;
                case "Tab":
                    break;
                default:
                    if (e.key.length === 1 && !/\d/.test(e.key))
                        e.preventDefault();
            }
        },
        [digits, emit, focus, length],
    );

    // ── onPaste ───────────────────────────────────────────────────────────────
    const handlePaste = useCallback(
        (e: ClipboardEvent<HTMLInputElement>, idx: number) => {
            e.preventDefault();
            const pasted = e.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, length);
            if (!pasted) return;

            const next = [...digits];
            pasted.split("").forEach((char, i) => {
                if (idx + i < length) next[idx + i] = char;
            });
            emit(next);

            const nextEmpty = next.findIndex((d, i) => i >= idx && !d);
            focus(nextEmpty === -1 ? length - 1 : nextEmpty);
        },
        [digits, emit, focus, length],
    );

    // ── Android backspace fallback ─────────────────────────────────────────────
    const handleInput = useCallback(
        (idx: number, e: React.FormEvent<HTMLDivElement>) => {
            if (
                (e.nativeEvent as InputEvent).inputType !==
                "deleteContentBackward"
            )
                return;
            // Тайминг-фильтр: если keyDown уже обработал backspace < 50мс назад — пропускаем
            if (Date.now() - backspaceHandledAtRef.current < 50) return;

            const next = [...digits];
            if (next[idx]) {
                next[idx] = "";
                emit(next);
            } else if (idx > 0) {
                next[idx - 1] = "";
                emit(next);
                focus(idx - 1);
            }
        },
        [digits, emit, focus],
    );

    // ── IME ───────────────────────────────────────────────────────────────────
    const handleCompositionStart = useCallback(() => {
        isComposingRef.current = true;
    }, []);

    const handleCompositionEnd = useCallback(
        (e: CompositionEvent<HTMLInputElement>, idx: number) => {
            isComposingRef.current = false;
            const char = e.data?.replace(/\D/g, "").slice(-1);
            if (char) handleChange(idx, char);
        },
        [handleChange],
    );

    const handleClick = useCallback((idx: number) => {
        inputsRef.current[idx]?.select();
    }, []);

    return (
        <Box
            display="flex"
            gap={{ xs: 0.75, sm: 1 }}
            justifyContent="center"
            role="group"
            aria-label="One-time password input"
            sx={sx}
        >
            {digits.map((digit, idx) => (
                <StyledTextField
                    key={idx}
                    value={digit}
                    inputRef={(el: HTMLInputElement | null) => {
                        inputsRef.current[idx] = el;
                    }}
                    disabled={disabled}
                    error={error}
                    slotProps={{
                        htmlInput: {
                            maxLength: 1,
                            inputMode: "numeric" as const,
                            pattern: "[0-9]*",
                            autoComplete: idx === 0 ? "one-time-code" : "off",
                            "aria-label": `Digit ${idx + 1} of ${length}`,
                            style: {
                                textAlign: "center" as const,
                                fontSize: theme.typography.h5.fontSize,
                                fontWeight: theme.typography.fontWeightBold,
                                fontFamily: theme.typography.fontFamily,
                                padding: `${theme.spacing(1.5)} 0`,
                                caretColor: "transparent",
                            },
                        },
                    }}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) =>
                        handleKeyDown(idx, e as KeyboardEvent<HTMLInputElement>)
                    }
                    onPaste={(e) =>
                        handlePaste(e as ClipboardEvent<HTMLInputElement>, idx)
                    }
                    onInput={(e) => handleInput(idx, e)}
                    onFocus={(e) => e.target.select()}
                    onClick={() => handleClick(idx)}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={(e) =>
                        handleCompositionEnd(
                            e as CompositionEvent<HTMLInputElement>,
                            idx,
                        )
                    }
                    sx={{
                        width: {
                            xs: theme.spacing(5.25),
                            sm: theme.spacing(6),
                        },
                        flexShrink: 0,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            transition: theme.transitions.create(
                                [
                                    "box-shadow",
                                    "border-color",
                                    "background-color",
                                ],
                                { duration: theme.transitions.duration.short },
                            ),
                            bgcolor: digit ? "action.hover" : "transparent",
                            "&.Mui-focused": {
                                boxShadow: `0 0 0 3px ${theme.palette.primary.main}33`,
                            },
                            "&.Mui-error": {
                                boxShadow: `0 0 0 3px ${theme.palette.error.main}22`,
                            },
                            "&.Mui-disabled": {
                                bgcolor: "action.disabledBackground",
                            },
                        },
                        "& input::selection": {
                            backgroundColor: "transparent",
                        },
                    }}
                />
            ))}
        </Box>
    );
}
