import { dark } from "@/theme/dark";
import { light, ThemeConfigStructure } from "@/theme/light";
import { createTheme } from "@mui/material";

export const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: "class",
        disableCssColorScheme: true,
    },
    colorSchemes: {
        light,
        dark,
    },
});

export type AvailableMode = "light" | "dark";

export const modes = ["light", "dark"] as AvailableMode[];

export const defaultThemeMode: AvailableMode = "light";
