import ChangePasswordForm from "@/components/form/user/ChangePasswordSettings";
import BreadcrumbsComponent from "@/components/features/Breadcrumbs/BreadcrumbsComponent";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import { Box } from "@mui/material";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { getTranslations } from "next-intl/server";

export default async function Page() {
    const t = await getTranslations();
    return (
        <Box>
            <Box sx={{ p: { xs: 2, sm: 4 } }}>
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

                <ChangePasswordForm
                    initialEmail="den.adsas@das"
                    initialStep={0}
                />
            </Box>
        </Box>
    );
}
