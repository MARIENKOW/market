import AuthErrorElement from "@/components/feedback/error/AuthErrorElement";
import ResetTokenErrorElement from "@/components/feedback/error/custom/ResetTokenErrorElement";
import ErrorHandlerElement from "@/components/feedback/error/ErrorHandlerElement";
import UserChangePasswordForm from "@/components/form/UserChangePasswordForm";
import UserRememberPasswordForm from "@/components/form/UserRememberPasswordForm";
import { ContainerComponent } from "@/components/ui/Container";
import { redirect } from "@/i18n/navigation";
import { $apiServer } from "@/utils/api/fetch.server";
import ResetPasswordTokenService from "@/services/resetPasswordToken/user/reset.password.token.service";
import { Box, Typography } from "@mui/material";
import { ApiErrorResponse } from "@myorg/shared/dto";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { getLocale, getTranslations } from "next-intl/server";
import { Params } from "next/dist/server/request/params";
import { SearchParams } from "next/dist/server/request/search-params";
import RedirectWithMessage from "@/components/features/RedirectWithMessage";

const resetPassword = new ResetPasswordTokenService($apiServer);

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<any>;
}) {
    const { token } = await searchParams;
    if (!token) {
        const locale = await getLocale();
        redirect({ href: FULL_PATH_ROUTE.path, locale });
    }
    const t = await getTranslations();
    try {
        await resetPassword.check({ token });
    } catch (error) {
        return (
            <ErrorHandlerElement
                fallback={{
                    notfound: {
                        element: (
                            <RedirectWithMessage
                                path={FULL_PATH_ROUTE.path}
                                message={t("api.NOT_FOUND")}
                                type="error"
                            />
                        ),
                    },
                    validation: {
                        element: <ResetTokenErrorElement error={error} />,
                    },
                }}
                error={error}
            />
        );
    }
    return (
        <ContainerComponent>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flex={1}
            >
                <Box
                    flex={"0 1 350px"}
                    display={"flex"}
                    flexDirection={"column"}
                >
                    <Typography
                        fontWeight={600}
                        color={"primary"}
                        sx={{ textAlign: "center", mb: 3 }}
                        variant="h6"
                        component="h2"
                    >
                        {t("pages.forgotPassword.changePassword.name")}
                    </Typography>
                    <UserChangePasswordForm />
                </Box>
            </Box>
        </ContainerComponent>
    );
}
