import { FormFieldProps } from "@/components/fields/FormTypes";
import { StyledTextField } from "@/components/ui/StyledTextField";
import FieldControll from "@/components/wrappers/FieldControll";
import { useFormConfig } from "@/components/wrappers/FormConfigProvider";
import { MessageKeyType } from "@myorg/shared/i18n";
import { useTranslations } from "next-intl";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";

export default function FormFilledTextField<TFieldValues extends FieldValues>({
    name,
    label,
    variant,
}: FormFieldProps<TFieldValues>) {
    const t = useTranslations();
    const {
        fields: { variant: configVariant },
    } = useFormConfig();

    const finalVariant = variant || configVariant;

    return (
        <FieldControll name={name}>
            {({ field, fieldState: { error } }) => (
                <StyledTextField
                    variant={finalVariant}
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
        </FieldControll>
    );
}
