"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandlerWithAlert } from "@/helpers/error/error.handler.helper";
import { useTranslations } from "next-intl";
import FormFilledTextField from "@/components/features/form/fields/controlled/FormTextField";
import { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import SimpleForm from "@/components/wrappers/form/SimpleForm";
import { Link, useRouter } from "@/i18n/navigation";
import AuthUserService from "@/services/auth/user/auth.user.service";
import {
    UserForgotPasswordDtoInput,
    UserForgotPasswordDtoOutput,
    UserForgotPasswordSchema,
} from "@myorg/shared/form";
import { $apiClient } from "@/lib/api/fetch.client";
import {
    FULL_PATH_ROUTE,
    USER_PUBLIC_FALLBACK_ROUTE,
} from "@myorg/shared/route";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box } from "@mui/material";
import { StyledTypography } from "@/components/ui/StyledTypograpty";

const authUser = new AuthUserService($apiClient);

export default function UserRememberPasswordForm() {
    const router = useRouter();
    const t = useTranslations();

    const onSubmit: CustomSubmitHandler<UserForgotPasswordDtoOutput> = async (
        body,
        { setError },
    ) => {
        try {
            const success = await authUser.forgotPassword(body);
            snackbarSuccess(success);
        } catch (error) {
            errorFormHandlerWithAlert({ error, setError, t });
        }
    };

    return (
        <SimpleForm<UserForgotPasswordDtoInput>
            params={{
                resolver: zodResolver(UserForgotPasswordSchema),
                defaultValues: {
                    email: "",
                },
            }}
            onSubmit={onSubmit}
        >
            <FormFilledTextField<UserForgotPasswordDtoInput>
                label={"form.email.label"}
                name={"email"}
            />
            <Box display={"flex"} gap={2} justifyContent={"space-between"}>
                <Link href={FULL_PATH_ROUTE.register.path}>
                    <Box alignItems={"center"} display={"inline-flex"}>
                        <ArrowLeftIcon color="primary" />
                        <StyledTypography
                            lineHeight={"100%"}
                            variant="body2"
                            color="primary"
                        >
                            {t("pages.register.name")}
                        </StyledTypography>
                    </Box>
                </Link>
                <Link href={FULL_PATH_ROUTE.login.path}>
                    <Box alignItems={"center"} display={"inline-flex"}>
                        <StyledTypography
                            lineHeight={"100%"}
                            variant="body2"
                            color="primary"
                        >
                            {t("pages.login.name")}
                        </StyledTypography>
                        <ArrowRightIcon color="primary" />
                    </Box>
                </Link>
            </Box>
            <Box mt={2} gap={2} display={"flex"} flexDirection={"column"}>
                <FormAlert />
                <SubmitButton />
            </Box>
        </SimpleForm>
    );
}
