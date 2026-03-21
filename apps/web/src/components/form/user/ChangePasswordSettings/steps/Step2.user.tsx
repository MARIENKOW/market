"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, CircularProgress } from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import { useLocale, useTranslations } from "next-intl";

import FormProvider from "@/components/wrappers/form/FormProvider";
import Form, { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import useForm from "@/hooks/useForm";
import { errorFormHandlerWithAlert } from "@/helpers/error/error.handler.helper";
import {
    UserChangePasswordCodeDtoInput,
    UserChangePasswordCodeDtoOutput,
    UserChangePasswordCodeSchema,
} from "@myorg/shared/form";
import { StyledAlert } from "@/components/ui/StyledAlert";
import { StyledButton } from "@/components/ui/StyledButton";
import FormOtpInput from "@/components/features/form/fields/controlled/FormOtpInput";
import { Success } from "@/components/form/user/ChangePasswordSettings";
import { formatDuration } from "@/utils/formatDuration";

const RESEND_COOLDOWN = 60;

interface Props {
    success: Success;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ChangePasswordSettingsStep2User({
    success,
    onSuccess,
    onCancel,
}: Props) {
    const t = useTranslations();
    const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN);
    const [resending, setResending] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const locale = useLocale();

    const startTimer = () => {
        clearInterval(timerRef.current!);
        setResendCooldown(RESEND_COOLDOWN);
        timerRef.current = setInterval(() => {
            setResendCooldown((s) => {
                if (s <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current!);
    }, []);

    const handleResend = async () => {
        setResending(true);
        try {
            // await changePasswordService.resend();
            startTimer();
        } finally {
            setResending(false);
        }
    };

    const handleCancel = async () => {
        setCancelling(true);
        try {
            // await changePasswordService.cancel();
            onCancel();
        } finally {
            setCancelling(false);
        }
    };

    const form = useForm<UserChangePasswordCodeDtoInput>({
        resolver: zodResolver(UserChangePasswordCodeSchema),
        defaultValues: { code: "" },
    });

    const onSubmit: CustomSubmitHandler<
        UserChangePasswordCodeDtoOutput
    > = async (formValues, { setError }) => {
        try {
            // await changePasswordService.confirm(formValues);
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
                            email: success.email,
                            time: formatDuration(success.time, locale),
                        })}
                    </StyledAlert>

                    <FormOtpInput name="code" label="form.code.label" />

                    {/* Resend + Cancel */}
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        gap={1}
                    >
                        {/* Отмена запроса */}
                        <StyledButton
                            variant="text"
                            size="small"
                            color="error"
                            disabled={cancelling}
                            onClick={handleCancel}
                            startIcon={
                                cancelling ? (
                                    <CircularProgress size={13} color="error" />
                                ) : undefined
                            }
                        >
                            {t("pages.profile.settings.password.cancel")}
                        </StyledButton>

                        {/* Повторная отправка */}
                        <StyledButton
                            variant="text"
                            size="small"
                            disabled={resendCooldown > 0 || resending}
                            onClick={handleResend}
                            sx={{ minWidth: 150 }}
                            startIcon={
                                resending ? (
                                    <CircularProgress size={13} />
                                ) : undefined
                            }
                        >
                            {resendCooldown > 0
                                ? t(
                                      "pages.profile.settings.password.resendIn",
                                      { seconds: resendCooldown },
                                  )
                                : t("pages.profile.settings.password.resend")}
                        </StyledButton>
                    </Box>

                    <FormAlert />
                    <SubmitButton />
                </Box>
            </Form>
        </FormProvider>
    );
}
