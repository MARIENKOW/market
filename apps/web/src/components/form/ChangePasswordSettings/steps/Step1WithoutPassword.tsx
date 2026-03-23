"use client";

import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";

import FormProvider from "@/components/wrappers/form/FormProvider";
import Form, { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import FormPassword from "@/components/features/form/fields/controlled/FormPassword";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import useForm from "@/hooks/useForm";
import { errorFormHandlerWithAlert } from "@/helpers/error/error.handler.helper";
import {
    ChangePasswordDtoInput,
    ChangePasswordDtoOutput,
    ChangePasswordSchema,
} from "@myorg/shared/form";
import { FetchCustomReturn } from "@/utils/api";
import { MailSendSuccess } from "@myorg/shared/dto";

interface Props {
    onSuccess: (success: MailSendSuccess) => void;
    onInit: (
        dto: ChangePasswordDtoOutput,
    ) => FetchCustomReturn<MailSendSuccess>;
}

export default function Step1WithoutPassword({ onSuccess, onInit }: Props) {
    const t = useTranslations();

    const form = useForm<ChangePasswordDtoInput>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: { password: "", rePassword: "" },
    });

    const { trigger, control } = form;

    const [password, rePassword] = useWatch({
        control,
        name: ["password", "rePassword"],
    });

    useEffect(() => {
        if (!password || !rePassword) return;
        trigger("rePassword");
    }, [password, rePassword, trigger]);

    const onSubmit: CustomSubmitHandler<ChangePasswordDtoOutput> = async (
        formValues,
        { setError },
    ) => {
        try {
            const { data } = await onInit(formValues);
            onSuccess(data);
        } catch (error) {
            errorFormHandlerWithAlert({ error, setError, t, formValues });
        }
    };

    return (
        <FormProvider<ChangePasswordDtoInput> form={form}>
            <Form<ChangePasswordDtoInput> form={form} onSubmit={onSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <FormPassword<ChangePasswordDtoInput>
                        name="password"
                        label="form.newPassword.label"
                    />
                    <FormPassword<ChangePasswordDtoInput>
                        name="rePassword"
                        label="form.rePassword.label"
                    />
                </Box>
                <FormAlert />
                <Box display={"flex"} mt={4}>
                    <SubmitButton />
                </Box>
            </Form>
        </FormProvider>
    );
}
