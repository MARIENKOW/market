"use client";

import {
    UserChangePasswordDtoInput,
    UserChangePasswordDtoOutput,
    UserChangePasswordSchema,
} from "@myorg/shared/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandlerWithAlert } from "@/helpers/error/error.form.helper";
import { useTranslations } from "next-intl";
import Form, { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import FormPassword from "@/components/features/form/fields/controlled/FormPassword";
import useForm from "@/hooks/useForm";
import FormProvider from "@/components/wrappers/form/FormProvider";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { useRouter } from "@/i18n/navigation";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { $apiClient } from "@/lib/api/fetch.client";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { Box } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";

const authUser = new AuthUserService($apiClient);

export default function UserChangePasswordForm() {
    const t = useTranslations();
    const router = useRouter();
    const { token } = useParams();
    const searchParams = useSearchParams();

    const form = useForm<UserChangePasswordDtoInput>({
        resolver: zodResolver(UserChangePasswordSchema),
        defaultValues: {
            password: "",
            rePassword: "",
        },
    });

    const { trigger, control } = form;

    const password = useWatch<UserChangePasswordDtoInput>({
        name: "password",
        control,
    });
    const rePassword = useWatch<UserChangePasswordDtoInput>({
        name: "rePassword",
        control,
    });

    useEffect(() => {
        if (!password || !rePassword) return;
        trigger("rePassword");
    }, [password, trigger, rePassword]);

    const onSubmit: CustomSubmitHandler<UserChangePasswordDtoOutput> = async (
        data,
        { setError },
    ) => {
        try {
            await authUser.changePassword(data, {
                token: token as string,
                email: searchParams.get("email"),
            });
            snackbarSuccess(t("form.register.success"));
            router.push(FULL_PATH_ROUTE.login.path);
        } catch (error) {
            errorFormHandlerWithAlert({ error, setError });
        }
    };

    return (
        <FormProvider<UserChangePasswordDtoInput> form={form}>
            <Form<UserChangePasswordDtoInput> form={form} onSubmit={onSubmit}>
                <FormPassword<UserChangePasswordDtoInput>
                    name="password"
                    label="form.password.label"
                />
                <FormPassword<UserChangePasswordDtoInput>
                    name="rePassword"
                    label="form.rePassword.label"
                />
                <Box mt={2} gap={2} display={"flex"} flexDirection={"column"}>
                    <FormAlert />
                    <SubmitButton />
                </Box>
            </Form>
        </FormProvider>
    );
}
