"use client";

import { useEffect } from "react";
import { DropZone } from "@/components/features/form/fields/uncontrolled/DropZone";
import { StyledFormHelperText } from "@/components/ui/StyledFormHelperText";
import { MessageKeyType } from "@myorg/shared/i18n";
import { useTranslations } from "next-intl";
import {
    Controller,
    FieldError,
    FieldValues,
    Path,
    useFormContext,
} from "react-hook-form";
import { snackbarError } from "@/utils/snackbar/snackbar.error";

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
    const {
        control,
        formState: { errors },
    } = useFormContext<T>();

    const fieldErrors = errors[name];

    useEffect(() => {
        if (!Array.isArray(fieldErrors)) return;
        const messages = [
            ...new Set(
                (fieldErrors as Array<FieldError | undefined>)
                    .filter((e) => e?.message)
                    .map((e) => e!.message!),
            ),
        ];
        messages.forEach((msg) => snackbarError(t(msg as MessageKeyType)));
    }, [fieldErrors, t]);
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
                <>
                    <DropZone
                        onFiles={(files) =>
                            onChange(multiple ? files : (files[0] ?? null))
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
