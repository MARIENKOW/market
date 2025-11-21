'use client'

import { MuiThemeProvider } from "@/components/wrappers/MuiThemeProvider";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarProvider } from "notistack";
import { IconButton } from "@mui/material";
import { closeSnackbar } from "notistack";

export const MainProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <MuiThemeProvider>
            <SnackbarProvider
                action={(snackbarId) => (
                    <IconButton onClick={() => closeSnackbar(snackbarId)}>
                        <CloseIcon htmlColor="#fff" />
                    </IconButton>
                )}
            >
                {children}
            </SnackbarProvider>
        </MuiThemeProvider>
    );
};
