// hooks/useAppForm.ts
import {
    FieldValues,
    useForm as useFormMui,
    UseFormProps,
} from "react-hook-form";

const DEFAULT_FORM_OPTIONS = {
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
} as const;

export default function useForm<TFieldValues extends FieldValues>(
    params: UseFormProps<TFieldValues>
) {
    return useFormMui<TFieldValues>({
        ...DEFAULT_FORM_OPTIONS,
        ...params,
    });
}
