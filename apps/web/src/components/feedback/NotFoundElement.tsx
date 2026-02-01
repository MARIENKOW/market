import { Box } from "@mui/material";
import { MessageKeyType } from "@myorg/shared/i18n";
import { getTranslations } from "next-intl/server";

export default async function NotFoundElement({
    message,
}: {
    message?: string;
}) {
    const t = await getTranslations();
    return (
        <Box
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
        >
            {t("pages.notFound.name")}
        </Box>
    );
}
