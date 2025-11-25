"use client";

import { CacheProvider } from "@emotion/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { MuiThemeProvider } from "@/components/wrappers/MuiThemeProvider";
import { SnackbarProvider } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { closeSnackbar } from "notistack";
import createCache from "@emotion/cache";

export const emotionCache = createCache({ key: "mui", prepend: true });

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <CacheProvider value={emotionCache}>
            <AppRouterCacheProvider
                options={{ enableCssLayer: true, key: "css" }}
            >
                <MuiThemeProvider>
                    <SnackbarProvider
                        action={(snackbarId) => (
                            <IconButton
                                onClick={() => closeSnackbar(snackbarId)}
                            >
                                <CloseIcon htmlColor="#fff" />
                            </IconButton>
                        )}
                    >
                        {children}
                    </SnackbarProvider>
                </MuiThemeProvider>
            </AppRouterCacheProvider>
        </CacheProvider>
    );
};
