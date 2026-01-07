// components/wrappers/Form.tsx
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export type CustomSubmitHandler<TFieldValues extends FieldValues> = (
    data: TFieldValues,
    methods: UseFormReturn<TFieldValues>,
    event?: React.BaseSyntheticEvent
) => void | Promise<void>;

interface Props<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>;
    onSubmit: CustomSubmitHandler<TFieldValues>;
    children: React.ReactNode;
}

export default function Form<TFieldValues extends FieldValues>({
    form,
    onSubmit,
    children,
}: Props<TFieldValues>) {
    return (
        <form
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
            }}
            onSubmit={form.handleSubmit((data, event) =>
                onSubmit(data, form, event)
            )}
        >
            {children}
        </form>
    );
}
