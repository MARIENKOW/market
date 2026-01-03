import { LanguageChange } from "@/components/blocks/LanguageChange";
import ThemeChange from "@/components/blocks/ThemeChange";
import { ContainerComponent } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Box, Button, Toolbar } from "@mui/material";
import { route } from "@myorg/shared/route";
import { getTranslations } from "next-intl/server";

export default async function Header() {
    const t = await getTranslations();
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
                    <Box alignItems={'center'} display={"flex"} gap={1}>
                        <ThemeChange />
                        <LanguageChange />
                    </Box>
                </Box>
            </ContainerComponent>
        </Box>
    );
}
