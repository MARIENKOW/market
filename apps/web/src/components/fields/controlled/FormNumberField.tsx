import { FormFieldProps } from "@/components/fields/FormTypes";
import { NumberFieldCommponent } from "@/components/fields/uncontrolled/NumberFieldCommponent";
import { PasswordComponent } from "@/components/fields/uncontrolled/PasswordComponent";
import { StyledTextField } from "@/components/ui/StyledTextField";
import FieldControll from "@/components/wrappers/FieldControll";
import { useFormConfig } from "@/components/wrappers/FormConfigProvider";
import { MessageKeyType } from "@myorg/shared/i18n";
import { useTranslations } from "next-intl";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";

export default function FormNumberField<TFieldValues extends FieldValues>({
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
            {({ field: { value, onChange }, fieldState: { error } }) => (
                <StyledTextField
                    variant={finalVariant}
                    label={t(label)}
                    error={!!error}
                    inputMode="numeric"
                    value={value}
                    onChange={({ target }) => {
                        console.log(target.value);
                        onChange(target.value);
                    }}
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
