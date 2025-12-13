"use client";

import * as React from "react";
import {
    ThemeProvider,
    CssBaseline,
    createTheme,
    useColorScheme,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { AvailableMode, theme } from "@/theme/theme";
import { useRouter } from "@/i18n/navigation";
import { ThemeConfigStructure } from "@/theme/light";
import { setThemeMode } from "@/theme/themeMode";
// import { experimental_extendTheme as extendTheme } from "@mui/material";

type ThemeRegistryType = {
    themeMode: AvailableMode;
    children: React.ReactNode;
};

export default function ThemeRegistry({
    themeMode,
    children,
}: ThemeRegistryType) {
    // const { mode, setMode } = useColorScheme();

    // const [mode, setMode] = React.useState<AvailableMode>(themeMode);

    // const toggleTheme = () => {
    //     console.log(mode);
    //     setMode("light");
    // };

    return (
        <ThemeProvider
            storageManager={null}
            defaultMode={themeMode}
            theme={theme}
            disableTransitionOnChange
        >
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    );
}

export function useThemeContext() {
    const { mode, systemMode, setMode } = useColorScheme();

    const toggleTheme = async () => {
        const newMode = mode === "dark" ? "light" : "dark";
        setMode(newMode);
        await setThemeMode(newMode);
    };
    return { themeMode: mode, toggleTheme };
}
