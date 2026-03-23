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
    UserChangePasswordSettingsDtoInput,
    UserChangePasswordSettingsDtoOutput,
    UserChangePasswordSettingsSchema,
} from "@myorg/shared/form";
import { StyledDivider } from "@/components/ui/StyledDivider";
import ChangePasswordUserService, {
    MailSendSuccess,
} from "@/services/user/changePassword.user.service";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";

interface Props {
    onSuccess: (success: MailSendSuccess) => void;
}

const changePass = new ChangePasswordUserService($apiUserClient);

export default function ChangePasswordSettingsStep1User({ onSuccess }: Props) {
    const t = useTranslations();

    const form = useForm<UserChangePasswordSettingsDtoInput>({
        resolver: zodResolver(UserChangePasswordSettingsSchema),
        defaultValues: { currentPassword: "", newPassword: "", rePassword: "" },
    });

    const { trigger, control } = form;

    const [newPassword, rePassword, currentPassword] = useWatch({
        control,
        name: ["newPassword", "rePassword", "currentPassword"],
    });

    useEffect(() => {
        if (!newPassword || !currentPassword) return;
        trigger("newPassword");
    }, [currentPassword, newPassword, trigger]);

    useEffect(() => {
        if (!newPassword || !rePassword) return;
        trigger("rePassword");
    }, [newPassword, rePassword, trigger]);

    const onSubmit: CustomSubmitHandler<
        UserChangePasswordSettingsDtoOutput
    > = async (formValues, { setError }) => {
        try {
            const { data } = await changePass.init(formValues);
            onSuccess(data);
        } catch (error) {
            errorFormHandlerWithAlert({ error, setError, t, formValues });
        }
    };

    return (
        <FormProvider<UserChangePasswordSettingsDtoInput> form={form}>
            <Form<UserChangePasswordSettingsDtoInput>
                form={form}
                onSubmit={onSubmit}
            >
                <Box display="flex" flexDirection="column" gap={2}>
                    <FormPassword<UserChangePasswordSettingsDtoInput>
                        name="currentPassword"
                        label="form.currentPassword.label"
                    />
                    <StyledDivider />
                    <FormPassword<UserChangePasswordSettingsDtoInput>
                        name="newPassword"
                        label="form.newPassword.label"
                    />
                    <FormPassword<UserChangePasswordSettingsDtoInput>
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
