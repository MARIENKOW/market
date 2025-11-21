import { Alert, styled } from "@mui/material";

export const StyledAlert = styled(Alert)(({ theme }) => ({
    "&.MuiAlert-filledError": {
        background: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        "& .MuiAlert-icon": {
            color: theme.palette.error.light,
        },
    },
}));
