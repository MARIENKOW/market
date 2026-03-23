"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import { useLocale, useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

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
import { MailSendSuccess } from "@/services/user/changePassword.user.service";
import CancelPasswordChange from "../features/CancelPasswordChange";
import ResendPasswordChange from "../features/ResendPasswordChange";
import { ApiErrorResponse, ErrorsWithMessages } from "@myorg/shared/dto";

interface Props {
    mailSendSuccess: MailSendSuccess;
    setMailSendSuccess: Dispatch<SetStateAction<MailSendSuccess>>;
    onCancel: () => void;
    onConfirm: (dto: UserChangePasswordCodeDtoOutput) => Promise<void>;
    onResend: () => Promise<MailSendSuccess>;
    onCancelRequest: () => Promise<void>;
}

export default function Step2({
    mailSendSuccess,
    setMailSendSuccess,
    onCancel,
    onConfirm,
    onResend,
    onCancelRequest,
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
            await onConfirm(formValues);
        } catch (error) {
            errorFormHandlerWithAlert({
                error,
                setError,
                t,
                formValues,
                fallback: {
                    notfound: {
                        callback: onCancel,
                    },
                    validation: {
                        callback() {
                            const { data } = error as ApiErrorResponse;
                            const { root } = data as ErrorsWithMessages;
                            if (root?.[0]?.data?.return) onCancel();
                        },
                    },
                },
            });
        }
    };

    return (
        <FormProvider<UserChangePasswordCodeDtoInput> form={form}>
            <Form<UserChangePasswordCodeDtoInput>
                form={form}
                onSubmit={onSubmit}
            >
                <Box display="flex" flexDirection="column" gap={6}>
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

                    <Box display={"flex"} flexDirection={"column"} gap={1}>
                        <FormAlert />
                        <Box
                            display={"flex"}
                            flexWrap={"wrap"}
                            flexDirection={"column"}
                            gap={1}
                        >
                            <ResendPasswordChange
                                initialCooldown={mailSendSuccess.cooldown}
                                onCancel={onCancel}
                                onResend={async () => {
                                    const data = await onResend();
                                    setMailSendSuccess(data);
                                    return data;
                                }}
                            />
                            <CancelPasswordChange
                                onCancel={onCancel}
                                onCancelRequest={onCancelRequest}
                            />
                        </Box>
                        <SubmitButton />
                    </Box>
                </Box>
            </Form>
        </FormProvider>
    );
}
