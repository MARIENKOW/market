"use client";

import { Toaster } from "sonner";
import { useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useThemeContext } from "@/theme/ThemeRegistry";
import { AvailableMode } from "@/theme/theme";

export const StyledToaster = ({
    serverMode,
}: {
    serverMode: AvailableMode;
}) => {
    const { themeMode } = useThemeContext(serverMode);
    const { palette: p, typography, shape } = useTheme();
    const isDark = themeMode === "dark";

    return (
        <Toaster
            theme={themeMode}
            position="bottom-right"
            richColors
            expand
            gap={8}
            closeButton
            toastOptions={{ duration: 4000 }}
            style={
                {
                    fontFamily: typography.fontFamily,
                    "--border-radius": `${Number(shape.borderRadius) * 1.5}px`,

                    // ── Normal ────────────────────────────────────
                    "--normal-bg": p.background.paper,
                    "--normal-text": p.text.primary,
                    "--normal-border": p.divider,

                    // ── Success ───────────────────────────────────
                    "--success-bg": isDark
                        ? alpha(p.success.dark, 0.3)
                        : alpha(p.success.light, 0.25),
                    "--success-text": isDark ? p.success.light : p.success.dark,
                    "--success-border": alpha(p.success.main, 0.4),

                    // ── Error ─────────────────────────────────────
                    "--error-bg": isDark
                        ? alpha(p.error.dark, 0.3)
                        : alpha(p.error.light, 0.22),
                    "--error-text": isDark ? p.error.light : p.error.dark,
                    "--error-border": alpha(p.error.main, 0.4),

                    // ── Warning ───────────────────────────────────
                    "--warning-bg": isDark
                        ? alpha(p.warning.dark, 0.3)
                        : alpha(p.warning.light, 0.22),
                    "--warning-text": isDark ? p.warning.light : p.warning.dark,
                    "--warning-border": alpha(p.warning.main, 0.4),

                    // ── Info ──────────────────────────────────────
                    "--info-bg": isDark
                        ? alpha(p.info.dark, 0.3)
                        : alpha(p.info.light, 0.22),
                    "--info-text": isDark ? p.info.light : p.info.dark,
                    "--info-border": alpha(p.info.main, 0.4),
                } as React.CSSProperties
            }
        />
    );
};
