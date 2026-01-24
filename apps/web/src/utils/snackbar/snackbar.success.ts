import { enqueueSnackbar } from "notistack";

export const snackbarSuccess = (value: string) => {
    return enqueueSnackbar(value, { variant: "success" });
};
