import BreadcrumbsComponent from "@/components/features/Breadcrumbs/BreadcrumbsComponent";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import { Box } from "@mui/material";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { getTranslations } from "next-intl/server";
import ChangePasswordUserService from "@/services/user/changePassword.user.service";
import ErrorHandlerElement from "@/components/feedback/error/ErrorHandlerElement";
import { $apiUserServer } from "@/utils/api/user/fetch.user.server";
import ChangePasswordSettings from "@/components/form/user/ChangePasswordSettings";

const changePassword = new ChangePasswordUserService($apiUserServer);

export default async function Page() {
    const t = await getTranslations();
    let data;
    let error;
    try {
        const body = await changePassword.status();
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
                            name: t("pages.profile.settings.password.name"),
                            href: FULL_PATH_ROUTE.profile.settings.password
                                .path,
                            key: "sett2",
                        },
                    ]}
                />
            </Box>
            <StyledTypography variant="h5" fontWeight={700} mb={0.5}>
                {t("pages.profile.settings.password.name")}
            </StyledTypography>
            <StyledTypography variant="body2" color="text.secondary" mb={4}>
                {t("pages.profile.settings.password.subtitle")}
            </StyledTypography>
            {error ? (
                <ErrorHandlerElement error={error} />
            ) : (
                data && (
                    <ChangePasswordSettings
                        initialMailSendSuccess={data?.pending}
                        withoutPassword={data?.withoutPassword}
                    />
                )
            )}
        </Box>
    );
}
