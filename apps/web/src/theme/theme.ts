import { dark } from "@/theme/dark";
import { light, ThemeConfigStructure } from "@/theme/light";

export const themeConfig = {
    cssVariables: {
        colorSchemeSelector: "class",
        disableCssColorScheme: true,
    },
    colorSchemes: {
        light,
        dark,
    },
};

export type AvailableMode = "light" | "dark";

export const modes = ["light", "dark"] as AvailableMode[];

export const defaultThemeMode: AvailableMode = "light";
