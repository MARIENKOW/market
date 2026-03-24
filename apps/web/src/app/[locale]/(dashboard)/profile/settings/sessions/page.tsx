import { SessionList } from "@/app/[locale]/(dashboard)/profile/settings/sessions/SessionList";
import BreadcrumbsComponent from "@/components/features/Breadcrumbs/BreadcrumbsComponent";
import ErrorHandlerElement from "@/components/feedback/error/ErrorHandlerElement";
import { StyledPaper } from "@/components/ui/StyledPaper";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import SessionServiceUser from "@/services/auth/user/session.service.user";
import { $apiUserServer } from "@/utils/api/user/fetch.user.server";
import { Box, Paper, Typography } from "@mui/material";
import { SessionUserDto, SessionUserViewDto } from "@myorg/shared/dto";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { getTranslations } from "next-intl/server";

const session = new SessionServiceUser($apiUserServer);

export default async function Page() {
    const t = await getTranslations();
    let data;
    let error: unknown;
    try {
        const body = await session.getMe();
        data = body.data;
    } catch (e) {
        error = e;
    }

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            flex={1}
            sx={{ p: { xs: 2, sm: 4 } }}
        >
            <Box mb={4} display={{ xs: "flex", md: "none" }}>
                <BreadcrumbsComponent
                    options={[
                        {
                            name: t("pages.profile.settings.name"),
                            href: FULL_PATH_ROUTE.profile.settings.path,
                            key: "sett",
                        },
                        {
                            name: t("pages.profile.settings.sessions.name"),
                            href: FULL_PATH_ROUTE.profile.settings.sessions
                                .path,
                            key: "sett2",
                        },
                    ]}
                />
            </Box>
            <StyledTypography variant="h5" fontWeight={700} mb={0.5}>
                {t("pages.profile.settings.sessions.name")}
            </StyledTypography>
            {error ? (
                <ErrorHandlerElement error={error} />
            ) : (
                <SessionList sessions={data} />
            )}
        </Box>
    );
}
