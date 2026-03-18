import { toast } from "sonner";

export const snackbarError = (value: string) => {
    return toast.error(value);
};
