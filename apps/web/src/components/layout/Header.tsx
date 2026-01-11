import { LanguageChange } from "@/components/features/LanguageChange";
import ThemeChange from "@/components/features/ThemeChange";
import { ContainerComponent } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { getThemeMode } from "@/theme/themeMode";
import { Box, Button, Toolbar } from "@mui/material";
import { route } from "@myorg/shared/route";
import { getTranslations } from "next-intl/server";
import AuthNavigation from "@/components/features/auth/AuthNavigation";

export default async function Header() {
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
                    <Link href={route.public.main}>
                        <Button>{t("pages.main.name")}</Button>
                    </Link>
                    <Box alignItems={"center"} display={"flex"} gap={1}>
                        <ThemeChange serverMode={mode} />
                        <LanguageChange />
                        <AuthNavigation />
                    </Box>
                </Box>
            </ContainerComponent>
        </Box>
    );
}
