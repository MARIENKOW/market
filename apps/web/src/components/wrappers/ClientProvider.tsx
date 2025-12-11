"use client";

import { SnackbarProvider } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { closeSnackbar } from "notistack";

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SnackbarProvider
            action={(snackbarId) => (
                <IconButton onClick={() => closeSnackbar(snackbarId)}>
                    <CloseIcon htmlColor="#fff" />
                </IconButton>
            )}
        >
            {children}
        </SnackbarProvider>
    );
};
