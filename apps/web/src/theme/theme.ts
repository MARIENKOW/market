import { dark } from "@/theme/dark";
import { light, ThemeConfigStructure } from "@/theme/light";
import { createTheme } from "@mui/material";

export const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: "class",
        disableCssColorScheme: true,
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        fontSize: 14,
        button: {
            textTransform: "none", // кнопки без всех заглавных букв
        },
    },
    colorSchemes: {
        light,
        dark,
    },
});

export type AvailableMode = "light" | "dark";

export const modes = ["light", "dark"] as AvailableMode[];

export const defaultThemeMode: AvailableMode = "light";
