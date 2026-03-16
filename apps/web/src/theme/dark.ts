import { ThemeConfigStructure } from "@/theme/light";
import { AvailableMode } from "@/theme/theme";

export const dark: ThemeConfigStructure = {
    palette: {
        mode: "dark" as AvailableMode,
        primary: {
            main: "#e0b860",
            dark: "#c9973a",
            light: "#f0ce88",
            contrastText: "#1a1408",
        },
        secondary: {
            main: "#c4896a",
            dark: "#a86848",
            light: "#e0aa8a",
            contrastText: "#ffffff",
        },
        default: {
            main: "#c8bca4",
            dark: "#e8dcc0",
            light: "#7a6848",
            contrastText: "#1e1a14",
        },
        success: {
            main: "#34d399",
            dark: "#10b981",
            light: "#6ee7b7",
            contrastText: "#ffffff",
        },
        error: {
            main: "#f87171",
            dark: "#ef4444",
            light: "#fca5a5",
            contrastText: "#ffffff",
        },
        warning: {
            main: "#fbbf24",
            dark: "#f59e0b",
            light: "#fcd34d",
            contrastText: "#ffffff",
        },
        info: {
            main: "#60a5fa",
            dark: "#3b82f6",
            light: "#93c5fd",
            contrastText: "#ffffff",
        },
        background: {
            default: "#1e1a14",
            paper: "#2a2418",
        },
        text: {
            primary: "#e8dcc0",
            secondary: "#7a6848",
            disabled: "#3e3828",
        },
        divider: "#302a1e",
        action: {
            active: "#e8dcc0",
            hover: "rgba(224,184,96,0.08)",
            selected: "rgba(224,184,96,0.16)",
            disabled: "#3e3828",
            disabledBackground: "rgba(255,255,255,0.06)",
        },
        common: {
            black: "#1e1a14",
            white: "#e8dcc0",
            onBackgroundChanel: "#252018",
        },
        hoverOpacity: 0.08,
        disabledOpacity: 0.38,
        focus: "rgba(224,184,96,0.22)",
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
    },
};
