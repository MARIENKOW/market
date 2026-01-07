import React from "react";
import {
    FormProvider as RHFFormProvider,
    FieldValues,
    UseFormReturn,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>;
    children: React.ReactNode;
}

export default function FormProvider<TFieldValues extends FieldValues>({
    form,
    children,
}: Props<TFieldValues>) {
    return <RHFFormProvider {...form}>{children}</RHFFormProvider>;
}
