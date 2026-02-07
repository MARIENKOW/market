"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    errorFormHandlerWithAlert,
    errorHandler,
} from "@/helpers/error/error.handler.helper";
import { useTranslations } from "next-intl";
import FormFilledTextField from "@/components/features/form/fields/controlled/FormTextField";
import { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import FormPassword from "@/components/features/form/fields/controlled/FormPassword";
import SimpleForm from "@/components/wrappers/form/SimpleForm";
import { Link, useRouter } from "@/i18n/navigation";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { UserLoginDtoInput, UserLoginSchema } from "@myorg/shared/form";
import { $apiClient } from "@/lib/api/fetch.client";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box } from "@mui/material";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import { MessageKeyType } from "@myorg/shared/i18n";

const authUser = new AuthUserService($apiClient);

export default function UserLoginForm({ redirectTo }: { redirectTo?: string }) {
    const router = useRouter();
    const t = useTranslations();

    const onSubmit: CustomSubmitHandler<UserLoginDtoInput> = async (
        formValues,
        { setError },
    ) => {
        try {
            await authUser.login(formValues);
            snackbarSuccess(t("pages.login.feedback.success.loginSuccess"));
            if (redirectTo) router.push(redirectTo);
            router.refresh();
        } catch (error) {
            errorFormHandlerWithAlert<UserLoginDtoInput>({
                error,
                setError,
                formValues,
                t,
            });
        }
    };

    return (
        <SimpleForm<UserLoginDtoInput>
            params={{
                resolver: zodResolver(UserLoginSchema),
                defaultValues: {
                    email: "",
                    password: "",
                },
            }}
            onSubmit={onSubmit}
        >
            <FormFilledTextField<UserLoginDtoInput>
                label={"form.email.label"}
                name={"email"}
            />
            <FormPassword<UserLoginDtoInput>
                name="password"
                label="form.password.label"
            />
            <Box display={"flex"} gap={2} justifyContent={"space-between"}>
                <Link href={FULL_PATH_ROUTE.forgotPasssword.path}>
                    <Box alignItems={"center"} display={"inline-flex"}>
                        <ArrowLeftIcon color="primary" />
                        <StyledTypography
                            lineHeight={"100%"}
                            variant="body2"
                            color="primary"
                        >
                            {t("pages.forgotPassword.name")}
                        </StyledTypography>
                    </Box>
                </Link>
                <Link href={FULL_PATH_ROUTE.register.path}>
                    <Box alignItems={"center"} display={"inline-flex"}>
                        <StyledTypography
                            lineHeight={"100%"}
                            variant="body2"
                            color="primary"
                        >
                            {t("pages.register.name")}
                        </StyledTypography>
                        <ArrowRightIcon color="primary" />
                    </Box>
                </Link>
            </Box>
            <Box mt={2} gap={2} display={"flex"} flexDirection={"column"}>
                <FormAlert />
                <SubmitButton />
            </Box>
            {/* <StyledDivider />
            <GoogleAuthButton /> */}
        </SimpleForm>
    );
}
