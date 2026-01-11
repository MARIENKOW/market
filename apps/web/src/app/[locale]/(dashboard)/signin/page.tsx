import UserSignInForm from "@/components/form/UserSignInForm";
import { ContainerComponent } from "@/components/ui/Container";
import { Box, Typography } from "@mui/material";
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
                    <Typography
                        fontWeight={600}
                        color={"primary"}
                        sx={{ textAlign: "center", mb: 3 }}
                        variant="h6"
                        component="h2"
                    >
                        {t("pages.signin.name")}
                    </Typography>
                    <UserSignInForm />
                </Box>
            </Box>
        </ContainerComponent>
    );
}
