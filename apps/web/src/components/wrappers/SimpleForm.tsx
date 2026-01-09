import Form, { CustomSubmitHandler } from "@/components/wrappers/Form";
import {
    DEFAULT_FORM_CONFIG,
    FormConfigPartial,
    FormConfigProvider,
    FormConfigType,
} from "@/components/wrappers/FormConfigProvider";
import FormProvider from "@/components/wrappers/FormProvider";
import useForm from "@/hooks/useForm";
import React from "react";
import { FieldValues, UseFormProps } from "react-hook-form";

export interface SimpleFormProps<TFieldValues extends FieldValues> {
    children: React.ReactNode;
    params: UseFormProps<TFieldValues>;
    onSubmit: CustomSubmitHandler<TFieldValues>;
    formConfig?: FormConfigPartial;
}

export default function SimpleForm<TFieldValues extends FieldValues>({
    children,
    params,
    onSubmit,
    formConfig,
}: SimpleFormProps<TFieldValues>) {
    const form = useForm<TFieldValues>(params);

    const mergedConfig: FormConfigType = {
        fields: { ...DEFAULT_FORM_CONFIG.fields, ...formConfig?.fields },
        submit: { ...DEFAULT_FORM_CONFIG.submit, ...formConfig?.submit },
    };

    return (
        <FormConfigProvider value={mergedConfig}>
            <FormProvider<TFieldValues> form={form}>
                <Form form={form} onSubmit={onSubmit}>
                    {children}
                </Form>
            </FormProvider>
        </FormConfigProvider>
    );
}
