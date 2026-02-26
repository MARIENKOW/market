import NotFoundActivateError from "@/app/[locale]/(dashboard)/activate/[token]/NotFoundActivateError";
import RedirectWithMessage from "@/components/features/RedirectWithMessage";
import ActivateErrorElement from "@/app/[locale]/(dashboard)/activate/[token]/ActivateErrorElement";
import ErrorHandlerElement from "@/components/feedback/error/ErrorHandlerElement";
import { redirect } from "@/i18n/navigation";
import { $apiServer } from "@/utils/api/fetch.server";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { Box, Typography } from "@mui/material";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { getLocale, getTranslations } from "next-intl/server";

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
    const locale = await getLocale();
    const t = await getTranslations();
    if (!email) {
        redirect({ href: FULL_PATH_ROUTE.path, locale });
    }
    try {
        await authUser.activate({ token, email });
        return (
            <RedirectWithMessage
                message={t("pages.activate.feedback.success.accountActivate")}
                type="success"
                path={FULL_PATH_ROUTE.login.path}
            />
        );
    } catch (error) {
        return (
            <ErrorHandlerElement
                fallback={{
                    notfound: { element: <NotFoundActivateError /> },
                    validation: {
                        element: (
                            <ActivateErrorElement error={error} email={email} />
                        ),
                    },
                }}
                error={error}
            />
        );
    }
}
