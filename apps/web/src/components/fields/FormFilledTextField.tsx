import FormControll from "@/components/fields/FormControll";
import { FormFieldProps } from "@/components/fields/FormTypes";
import { StyledTextField } from "@/components/ui/StyledTextField";
import { MessageKeyType } from "@myorg/shared/i18n";
import { useTranslations } from "next-intl";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";

export default function FormFilledTextField<TFieldValues extends FieldValues>({
    name,
    label,
}: FormFieldProps<TFieldValues>) {
    const t = useTranslations();

    return (
        <FormControll name={name}>
            {({ field, fieldState: { error } }) => (
                <StyledTextField
                    variant="filled"
                    label={t(label)}
                    error={!!error}
                    {...field}
                    helperText={
                        error?.message
                            ? t(error.message as MessageKeyType)
                            : undefined
                    }
                />
            )}
        </FormControll>
    );
}
