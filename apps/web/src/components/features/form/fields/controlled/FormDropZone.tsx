"use client";

import { DropZone } from "@/components/features/form/fields/uncontrolled/DropZone";
import { StyledFormHelperText } from "@/components/ui/StyledFormHelperText";
import { MessageKeyType } from "@myorg/shared/i18n";
import { useTranslations } from "next-intl";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface FormDropZoneProps<T extends FieldValues> {
    name: Path<T>;
    accept?: string[];
    multiple?: boolean;
    disabled?: boolean;
}

export default function FormDropZone<T extends FieldValues>({
    name,
    accept,
    multiple,
    disabled,
}: FormDropZoneProps<T>) {
    const t = useTranslations();
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
                <>
                    <DropZone
                        onFiles={(files) =>
                            onChange(multiple ? files : files[0] ?? null)
                        }
                        accept={accept}
                        multiple={multiple}
                        disabled={disabled}
                    />
                    {error?.message && (
                        <StyledFormHelperText error>
                            {t(error.message as MessageKeyType)}
                        </StyledFormHelperText>
                    )}
                </>
            )}
        />
    );
}
