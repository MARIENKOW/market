"use client";

import * as React from "react";
import {
    ThemeProvider,
    CssBaseline,
    createTheme,
    useColorScheme,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { AvailableMode, themeConfig } from "@/theme/theme";
import { useRouter } from "@/i18n/navigation";
import { ThemeConfigStructure } from "@/theme/light";

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

    const theme = React.useMemo(() => {
        return createTheme(themeConfig);
    }, []);

    // const toggleTheme = () => {
    //     console.log(mode);
    //     setMode("light");
    // };

    return (
        <ThemeProvider defaultMode={themeMode} theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    );
}
