import { enqueueSnackbar } from "notistack";

export const snackbarWarning = (value: string) => {
    return enqueueSnackbar(value, { variant: 'warning' });
};
