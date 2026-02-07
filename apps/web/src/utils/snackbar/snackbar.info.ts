import { enqueueSnackbar } from "notistack";

export const snackbarInfo = (value: string) => {
    return enqueueSnackbar(value, { variant: 'info' });
};
