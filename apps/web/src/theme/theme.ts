import { dark } from "@/theme/dark";
import { light, ThemeConfigStructure } from "@/theme/light";

export const ThemeModeModules = {
    dark,
    light,
};

export type AvailableMode = keyof typeof ThemeModeModules;

export const modes = Object.keys(ThemeModeModules) as AvailableMode[];

export const defaultThemeMode: AvailableMode = "light";

export const modeMap: Record<AvailableMode, ThemeConfigStructure> =
    ThemeModeModules;
