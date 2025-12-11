// import { ThemeOptions } from "@mui/material";
export const light = {
    // colorSchemes: { light: true, dark: true },
    // cssVariables: {
    //     colorSchemeSelector: "data",
    // },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        fontSize: 14,
        button: {
            textTransform: "none", // кнопки без всех заглавных букв
        },
    },
    palette: {
        primary: {
            main: "#1976d2",
            dark: "#115293",
            light: "#63a4ff",
            contrastText: "#fff",
        },
        secondary: {
            main: "#9c27b0",
            dark: "#6d1b7b",
            light: "#d05ce3",
            contrastText: "#fff",
        },
        success: {
            main: "#2e7d32",
            dark: "#1b5e20",
            light: "#60ad5e",
            contrastText: "#fff",
        },
        error: {
            main: "#d32f2f",
            dark: "#9a0007",
            light: "#ff6659",
            contrastText: "#fff",
        },
        warning: {
            main: "#ed6c02",
            dark: "#b53f00",
            light: "#ff9800",
            contrastText: "#fff",
        },
        info: {
            main: "#0288d1",
            dark: "#01579b",
            light: "#03a9f4",
            contrastText: "#fff",
        },
        background: {
            default: "#fafafa",
            paper: "#fff",
        },
        text: {
            primary: "#000",
            secondary: "#555",
            disabled: "#999",
        },
        divider: "#e0e0e0",
    },
};

export type ThemeConfigStructure = typeof light;


