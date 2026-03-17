import { LanguageChange } from "@/components/features/LanguageChange";
import ThemeChange from "@/components/features/ThemeChange";
import { ContainerComponent } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { getThemeMode } from "@/theme/themeMode";
import { Box, Button, Toolbar } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { FULL_PATH_ROUTE, ROUTE } from "@myorg/shared/route";
import NavigationAdmin from "@/components/features/auth/admin/Navigation.admin";
import AuthNavigationAdmin from "@/components/features/auth/admin/AuthNavigation.admin";

export default async function HeaderAdmin() {
    const t = await getTranslations();
    const mode = await getThemeMode();

    return (
        <Box
        //  position={"fixed"} top={0} left={0}
        //   width={"100%"} zIndex={1000}
        >
            <ContainerComponent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                        pt: 1,
                        pb: 1,
                    }}
                >
                    <Link href={FULL_PATH_ROUTE.admin.path}>
                        <Button>{t("pages.admin.name")}</Button>
                    </Link>
                    <Box alignItems={"center"} display={"flex"} gap={1}>
                        <ThemeChange serverMode={mode} />
                        <LanguageChange />
                        <AuthNavigationAdmin />
                    </Box>
                </Box>
            </ContainerComponent>
        </Box>
    );
}
