import { FormControlProps } from "@/components/fields/FormTypes";
import { StyledTextField } from "@/components/ui/StyledTextField";
import { MessageKeyType } from "@myorg/shared/i18n";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

export default function FieldControll<TFieldValues extends FieldValues>({
    name,
    children,
}: FormControlProps<TFieldValues>) {
    const t = useTranslations();
    const { control } = useFormContext<TFieldValues>();

    return (
        <Controller
            name={name}
            control={control}
            render={(methods) => children(methods)}
        />
    );
}
