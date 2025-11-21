import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
    ...theme,
    "&.Mui-disabled": {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        opacity: "0.3",
    },
    "&.MuiLoadingButton-loading": {
        background: theme.palette.primary.main,
        color: theme.palette.primary.main,
        opacity: "0.3",
        "& .MuiLoadingButton-loadingIndicator": {
            color: theme.palette.primary.contrastText,
        },
    },
}));
