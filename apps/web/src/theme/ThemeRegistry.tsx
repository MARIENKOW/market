"use client";

import * as React from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { AvailableMode, ThemeModeModules } from "@/theme/theme";
import { useRouter } from "@/i18n/navigation";
import { ThemeConfigStructure } from "@/theme/light";

type ThemeRegistryType = {
    themeMode: AvailableMode;
    children: React.ReactNode;
};

interface ThemeContextType {
    themeMode: AvailableMode;
    toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
    undefined
);

export default function ThemeRegistry({
    themeMode,
    children,
}: ThemeRegistryType) {
    const [mode, setMode] = React.useState<AvailableMode>(themeMode);

    const theme = React.useMemo(() => {
        return createTheme(ThemeModeModules[mode]);
    }, [mode]);

    const toggleTheme = () => {
        const newMode: AvailableMode = mode === "light" ? "dark" : "light";
        document.cookie = `theme=${newMode}; path=/; max-age=${60 * 60 * 24 * 365}`;
        setMode(newMode);
    };

    return (
        <ThemeContext.Provider value={{ themeMode: mode, toggleTheme }}>
            <AppRouterCacheProvider>
                <ThemeProvider 
                // forceThemeRerender
                theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => {
    const ctx = React.useContext(ThemeContext);
    if (!ctx)
        throw new Error("useThemeContext must be used inside ThemeProvider");
    return ctx;
};
