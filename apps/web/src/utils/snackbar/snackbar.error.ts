import { enqueueSnackbar } from "notistack";

export const snackbarError = (value: string) => {
    return enqueueSnackbar(value, { variant: "error" });
};
