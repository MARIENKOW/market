"use client";

import {
    UserRegisterDtoInput,
    UserRegisterDtoOutput,
    UserRegisterSchema,
} from "@myorg/shared/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandlerWithAlert } from "@/helpers/error/error.form.helper";
import { useTranslations } from "next-intl";
import FormFilledTextField from "@/components/features/form/fields/controlled/FormTextField";
import Form, { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import FormPassword from "@/components/features/form/fields/controlled/FormPassword";
import useForm from "@/hooks/useForm";
import FormProvider from "@/components/wrappers/form/FormProvider";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { StyledDivider } from "@/components/ui/StyledDivider";
import GoogleAuthButton from "@/components/features/form/GoogleAuthButton";
import { Link, useRouter } from "@/i18n/navigation";

import AuthUserService from "@/services/auth/user/auth.user.service";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { $apiClient } from "@/lib/api/fetch.client";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import { Box } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const authUser = new AuthUserService($apiClient);

export default function UserRegisterForm() {
    const t = useTranslations();
    const router = useRouter();

    const form = useForm<UserRegisterDtoInput>({
        resolver: zodResolver(UserRegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            rePassword: "",
        },
    });

    const { trigger, control } = form;

    const password = useWatch<UserRegisterDtoInput>({
        name: "password",
        control,
    });
    const rePassword = useWatch<UserRegisterDtoInput>({
        name: "rePassword",
        control,
    });

    useEffect(() => {
        if (!password || !rePassword) return;
        trigger("rePassword");
    }, [password, trigger, rePassword]);

    const onSubmit: CustomSubmitHandler<UserRegisterDtoOutput> = async (
        data,
        { setError },
    ) => {
        try {
            await authUser.register(data);
            snackbarSuccess(t("form.register.success"));
            router.push(FULL_PATH_ROUTE.login.path);
        } catch (error) {
            errorFormHandlerWithAlert({ error, setError, t });
        }
    };

    return (
        <FormProvider<UserRegisterDtoInput> form={form}>
            <Form<UserRegisterDtoInput> form={form} onSubmit={onSubmit}>
                <FormFilledTextField<UserRegisterDtoInput>
                    label={"form.email.label"}
                    name={"email"}
                />
                <FormPassword<UserRegisterDtoInput>
                    name="password"
                    label="form.password.label"
                />
                <FormPassword<UserRegisterDtoInput>
                    name="rePassword"
                    label="form.rePassword.label"
                />
                <Box display={"flex"} gap={2} justifyContent={"space-between"}>
                    <Link href={FULL_PATH_ROUTE.login.path}>
                        <Box alignItems={"center"} display={"inline-flex"}>
                            <ArrowLeftIcon color="primary" />
                            <StyledTypography
                                lineHeight={"100%"}
                                variant="body2"
                                color="primary"
                            >
                                {t("pages.login.name")}
                            </StyledTypography>
                        </Box>
                    </Link>
                </Box>
                <Box mt={2} gap={2} display={"flex"} flexDirection={"column"}>
                    <FormAlert />
                    <SubmitButton />
                </Box>
                {/* <StyledDivider />
                <GoogleAuthButton /> */}
            </Form>
        </FormProvider>
    );
}
