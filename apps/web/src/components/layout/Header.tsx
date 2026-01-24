import { LanguageChange } from "@/components/features/LanguageChange";
import ThemeChange from "@/components/features/ThemeChange";
import { ContainerComponent } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { getThemeMode } from "@/theme/themeMode";
import { Box, Button, Toolbar } from "@mui/material";
import { getTranslations } from "next-intl/server";
import AuthNavigation from "@/components/features/auth/AuthNavigation";
import { FULL_PATH_ROUTE, ROUTE } from "@myorg/shared/route";
import { getUserAuth } from "@/utils/cache/user.cache.me";

export default async function Header() {
    const t = await getTranslations();
    const mode = await getThemeMode();
    const { user, error } = await getUserAuth();
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
                    <Link href={FULL_PATH_ROUTE.path}>
                        <Button>{t("pages.main.name")}</Button>
                    </Link>
                    <Box alignItems={"center"} display={"flex"} gap={1}>
                        <ThemeChange serverMode={mode} />
                        <LanguageChange />
                        <AuthNavigation user={user} error={error} />
                    </Box>
                </Box>
            </ContainerComponent>
        </Box>
    );
}
