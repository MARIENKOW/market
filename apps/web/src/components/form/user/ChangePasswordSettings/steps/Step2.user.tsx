"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import { useLocale, useTranslations } from "next-intl";

import FormProvider from "@/components/wrappers/form/FormProvider";
import Form, { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import useForm from "@/hooks/useForm";
import { errorFormHandlerWithAlert } from "@/helpers/error/error.handler.helper";
import {
    CHANGE_PASSWORD_OTP_LENGTH,
    UserChangePasswordCodeDtoInput,
    UserChangePasswordCodeDtoOutput,
    UserChangePasswordCodeSchema,
} from "@myorg/shared/form";
import { StyledAlert } from "@/components/ui/StyledAlert";
import FormOtpInput from "@/components/features/form/fields/controlled/FormOtpInput";
import { formatDuration } from "@/utils/formatDuration";
import ChangePasswordUserService, {
    MailSendSuccess,
} from "@/services/user/changePassword.user.service";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";
import CancelPasswordChange from "@/components/form/user/ChangePasswordSettings/features/CancelPasswordChange";
import ResendPasswordChange from "@/components/form/user/ChangePasswordSettings/features/ResendPasswordChange";
import { FetchCustomReturn } from "@/utils/api";
import { Dispatch, SetStateAction } from "react";

interface Props {
    setMailSendSuccess: Dispatch<SetStateAction<MailSendSuccess>>;
    mailSendSuccess: MailSendSuccess;
    onSuccess: () => void;
    onCancel: () => void;
}

const changePassword = new ChangePasswordUserService($apiUserClient);
const resendChangePassword = new ChangePasswordUserService($apiUserClient);
const cancelChangePassword = new ChangePasswordUserService($apiUserClient);

export default function ChangePasswordSettingsStep2User({
    setMailSendSuccess,
    mailSendSuccess,
    onSuccess,
    onCancel,
}: Props) {
    const t = useTranslations();
    const locale = useLocale();

    const form = useForm<UserChangePasswordCodeDtoInput>({
        resolver: zodResolver(UserChangePasswordCodeSchema),
        defaultValues: { code: "" },
    });

    const onSubmit: CustomSubmitHandler<
        UserChangePasswordCodeDtoOutput
    > = async (formValues, { setError }) => {
        try {
            await changePassword.confirm(formValues);
            onSuccess();
        } catch (error) {
            errorFormHandlerWithAlert({ error, setError, t, formValues });
        }
    };

    return (
        <FormProvider<UserChangePasswordCodeDtoInput> form={form}>
            <Form<UserChangePasswordCodeDtoInput>
                form={form}
                onSubmit={onSubmit}
            >
                <Box display="flex" flexDirection="column" gap={3}>
                    <StyledAlert
                        severity="info"
                        icon={<MailOutline fontSize="small" />}
                    >
                        {t("pages.profile.settings.password.hint", {
                            email: mailSendSuccess.email,
                            time: formatDuration(mailSendSuccess.time, locale),
                        })}
                    </StyledAlert>

                    <FormOtpInput
                        length={CHANGE_PASSWORD_OTP_LENGTH}
                        name="code"
                        label="form.code.label"
                    />

                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        gap={1}
                    >
                        <CancelPasswordChange
                            onCancel={async () => {
                                await cancelChangePassword.cancel();
                                onCancel();
                            }}
                        />
                        <ResendPasswordChange
                            initialCooldown={mailSendSuccess.cooldown}
                            onResend={async () => {
                                const { data } =
                                    await resendChangePassword.resend();
                                setMailSendSuccess(data);
                                return data;
                            }}
                        />
                    </Box>

                    <FormAlert />
                    <SubmitButton />
                </Box>
            </Form>
        </FormProvider>
    );
}
