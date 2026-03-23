"use client";

import {
    ChangePasswordDtoInput,
    ChangePasswordDtoOutput,
    ChangePasswordSchema,
} from "@myorg/shared/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandlerWithAlert } from "@/helpers/error/error.handler.helper";
import { useTranslations } from "next-intl";
import Form, { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import FormPassword from "@/components/features/form/fields/controlled/FormPassword";
import useForm from "@/hooks/useForm";
import FormProvider from "@/components/wrappers/form/FormProvider";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { Link, useRouter } from "@/i18n/navigation";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";
import { ApiErrorResponse, ErrorsWithMessages } from "@myorg/shared/dto";
import { StyledButton } from "@/components/ui/StyledButton";
import { $apiClient } from "@/utils/api/fetch.client";

const authUser = new AuthUserService($apiClient);

export default function UserChangePasswordForm() {
    const t = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isShowButton, setIsShowButton] = useState<boolean>(false);

    const form = useForm<ChangePasswordDtoInput>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            password: "",
            rePassword: "",
        },
    });

    const { trigger, control } = form;

    const password = useWatch<ChangePasswordDtoInput>({
        name: "password",
        control,
    });
    const rePassword = useWatch<ChangePasswordDtoInput>({
        name: "rePassword",
        control,
    });

    useEffect(() => {
        if (!password || !rePassword) return;
        trigger("rePassword");
    }, [password, trigger, rePassword]);

    const onSubmit: CustomSubmitHandler<ChangePasswordDtoOutput> = async (
        formValues,
        { setError },
    ) => {
        setIsShowButton(false)
        try {
            await authUser.changePassword(formValues, {
                token: searchParams.get("token") as string,
            });
            snackbarSuccess(
                t(
                    "pages.forgotPassword.changePassword.feedback.success.changeSuccess",
                ),
            );
            router.push(FULL_PATH_ROUTE.login.path);
        } catch (error) {
            errorFormHandlerWithAlert({
                error,
                setError,
                t,
                formValues,
                fallback: {
                    validation: {
                        callback() {
                            const { data } = error as ApiErrorResponse;
                            const err = data as ErrorsWithMessages;
                            if (err.root?.[0].data?.isShowButton)
                                setIsShowButton(true);
                        },
                    },
                },
            });
        }
    };

    return (
        <FormProvider<ChangePasswordDtoInput> form={form}>
            <Form<ChangePasswordDtoInput> form={form} onSubmit={onSubmit}>
                <FormPassword<ChangePasswordDtoInput>
                    name="password"
                    label="form.password.label"
                />
                <FormPassword<ChangePasswordDtoInput>
                    name="rePassword"
                    label="form.rePassword.label"
                />
                <Box mt={2} gap={2} display={"flex"} flexDirection={"column"}>
                    <FormAlert />
                    {isShowButton && (
                        <Link href={FULL_PATH_ROUTE.forgotPasssword.path}>
                            <StyledButton fullWidth variant="outlined">
                                {t("pages.forgotPassword.name")}
                            </StyledButton>
                        </Link>
                    )}
                    <SubmitButton />
                </Box>
            </Form>
        </FormProvider>
    );
}
