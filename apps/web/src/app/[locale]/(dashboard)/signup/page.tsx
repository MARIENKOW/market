import UserSignUp from "@/components/form/UserSignUp";
import { LanguageChange } from "@/components/blocks/LanguageChange";
import { ContainerComponent } from "@/components/ui/Container";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "@/i18n/navigation";
import { route } from "@myorg/shared/route";
import { getTranslations } from "next-intl/server";

export default async function Page() {
    const t = await getTranslations();
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
                    <Link href={route.public.main}>
                        <Button>{t("pages.main.name")}</Button>
                    </Link>
                    <Typography
                        fontWeight={600}
                        color={"primary"}
                        sx={{ textAlign: "center", mb: 3 }}
                        variant="h6"
                        component="h2"
                    >
                        {t("pages.signup.name")}
                    </Typography>
                    <LanguageChange />
                    <UserSignUp />
                </Box>
            </Box>
        </ContainerComponent>
    );
}
