import AuthErrorElement from "@/components/feedback/error/AuthErrorElement";
import ResetTokenErrorElement from "@/components/feedback/error/custom/ResetTokenErrorElement";
import ErrorHandlerElement from "@/components/feedback/error/ErrorHandlerElement";
import UserChangePasswordForm from "@/components/form/UserChangePasswordForm";
import UserRememberPasswordForm from "@/components/form/UserRememberPasswordForm";
import { ContainerComponent } from "@/components/ui/Container";
import { $apiServer } from "@/lib/api/fetch.server";
import ResetPasswordTokenService from "@/services/resetPasswordToken/user/reset.password.token.service";
import { Box, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { Params } from "next/dist/server/request/params";
import { SearchParams } from "next/dist/server/request/search-params";

const resetPassword = new ResetPasswordTokenService($apiServer);

export default async function Page({
    searchParams,
    params,
}: {
    searchParams: Promise<any>;
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;
    const { email } = await searchParams;
    const t = await getTranslations();
    try {
        await resetPassword.check({ token, email });
    } catch (error) {
        return (
            <ErrorHandlerElement
                fallback={{
                    validation: { element: ResetTokenErrorElement },
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
                        {t("pages.forgotPasssword.changePassword.name")}
                    </Typography>
                    <UserChangePasswordForm />
                </Box>
            </Box>
        </ContainerComponent>
    );
}
