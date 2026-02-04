import AuthErrorElement from "@/components/feedback/error/AuthErrorElement";
import ResetTokenErrorElement from "@/components/feedback/error/custom/ResetTokenErrorElement";
import ErrorHandlerElement from "@/components/feedback/error/ErrorHandlerElement";
import UserChangePasswordForm from "@/components/form/UserChangePasswordForm";
import UserRememberPasswordForm from "@/components/form/UserRememberPasswordForm";
import { ContainerComponent } from "@/components/ui/Container";
import { $apiServer } from "@/lib/api/fetch.server";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { Box, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

const authUser = new AuthUserService($apiServer);

export default async function Page({
    searchParams,
    params,
}: {
    searchParams: Promise<any>;
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;
    const { email } = await searchParams;
    try {
        await authUser.activate({ token, email });
        return null;
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
}
