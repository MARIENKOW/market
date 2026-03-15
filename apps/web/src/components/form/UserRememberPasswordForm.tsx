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
import { $apiClient } from "@/utils/api/fetch.client";
import {
    FULL_PATH_ROUTE,
    USER_PUBLIC_FALLBACK_ROUTE,
} from "@myorg/shared/route";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box } from "@mui/material";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";

const authUser = new AuthUserService($apiUserClient);

export default function UserRememberPasswordForm() {
    const router = useRouter();
    const t = useTranslations();

    const onSubmit: CustomSubmitHandler<UserForgotPasswordDtoOutput> = async (
        formValues,
        { setError },
    ) => {
        try {
            const { data } = await authUser.forgotPassword(formValues);
            snackbarSuccess(data);
        } catch (error) {
            errorFormHandlerWithAlert({ error, setError, t, formValues });
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
            <Box mt={2} gap={2} display={"flex"} flexDirection={"column"}>
                <FormAlert />
                <SubmitButton />
            </Box>
        </SimpleForm>
    );
}
