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
    ChangePasswordCodeDtoInput,
    ChangePasswordCodeDtoOutput,
    ChangePasswordCodeSchema,
} from "@myorg/shared/form";
import { StyledAlert } from "@/components/ui/StyledAlert";
import FormOtpInput from "@/components/features/form/fields/controlled/FormOtpInput";
import { formatDuration } from "@/utils/formatDuration";
import CancelPasswordChange from "../features/CancelPasswordChange";
import ResendPasswordChange from "../features/ResendPasswordChange";
import {
    ApiErrorResponse,
    ErrorsWithMessages,
    MailSendSuccess,
} from "@myorg/shared/dto";
import { FetchCustomReturn } from "@/utils/api";
import { useRouter } from "@/i18n/navigation";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";

interface Props {
    mailSendSuccess: MailSendSuccess;
    setMailSendSuccess: Dispatch<SetStateAction<MailSendSuccess>>;
    onCancel: () => void;
    onConfirm: (dto: ChangePasswordCodeDtoOutput) => FetchCustomReturn<void>;
    onResend: () => FetchCustomReturn<MailSendSuccess>;
    onCancelRequest: () => FetchCustomReturn<void>;
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
    const router = useRouter();

    const form = useForm<ChangePasswordCodeDtoInput>({
        resolver: zodResolver(ChangePasswordCodeSchema),
        defaultValues: { code: "" },
    });

    const onSubmit: CustomSubmitHandler<ChangePasswordCodeDtoOutput> = async (
        formValues,
        { setError },
    ) => {
        try {
            await onConfirm(formValues);
            snackbarSuccess(t("features.changePassword.success"));
            router.refresh();
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
        <FormProvider<ChangePasswordCodeDtoInput> form={form}>
            <Form<ChangePasswordCodeDtoInput> form={form} onSubmit={onSubmit}>
                <Box display="flex" flexDirection="column" gap={6}>
                    <StyledAlert
                        severity="info"
                        icon={<MailOutline fontSize="small" />}
                    >
                        {t("features.changePassword.hint", {
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
                                    setMailSendSuccess(data.data);
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
