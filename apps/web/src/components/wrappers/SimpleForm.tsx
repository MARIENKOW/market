import Form, { CustomSubmitHandler } from "@/components/wrappers/Form";
import FormProvider from "@/components/wrappers/FormProvider";
import useForm from "@/hooks/useForm";
import React from "react";
import { FieldValues, UseFormProps } from "react-hook-form";

export interface SimpleFormProps<TFieldValues extends FieldValues> {
    children: React.ReactNode;
    params: UseFormProps<TFieldValues>;
    onSubmit: CustomSubmitHandler<TFieldValues>;
}

export default function SimpleForm<TFieldValues extends FieldValues>({
    children,
    params,
    onSubmit,
}: SimpleFormProps<TFieldValues>) {
    const form = useForm<TFieldValues>(params);

    return (
        <FormProvider<TFieldValues> form={form}>
            <Form form={form} onSubmit={onSubmit}>
                {children}
            </Form>
        </FormProvider>
    );
}
