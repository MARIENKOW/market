"use client";

import { StyledButton } from "@/components/ui/StyledButton";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import { Link } from "@/i18n/navigation";
import { Box } from "@mui/material";
import { MessageKeyType } from "@myorg/shared/i18n";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { useTranslations } from "next-intl";

type MessageProp = { message?: string; reset?: () => void };

export default function ResetTokenErrorElement({ message }: MessageProp) {
    const t = useTranslations();
    return (
        <Box
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
            gap={5}
        >
            <Box display={"flex"} gap={1} flexDirection={"column"}>
                <StyledTypography textAlign={"center"} variant={"h2"}>
                    {t("feedback.error.fallback.title")}
                </StyledTypography>
                <StyledTypography
                    textAlign={"center"}
                    maxWidth={700}
                    margin={"0px auto"}
                    variant={"h6"}
                >
                    {t("feedback.error.fallback.subtitle")}
                </StyledTypography>
                {message && (
                    <StyledTypography
                        overflow={"hidden"}
                        textAlign={"center"}
                        variant={"body1"}
                        color="text.secondary"
                        maxWidth={700}
                        margin={"0px auto"}
                    >
                        {message || ""}
                    </StyledTypography>
                )}
            </Box>
            <Link href={FULL_PATH_ROUTE.forgotPasssword.path}>
                <StyledButton variant="contained">
                    {t("pages.forgotPasssword.name")}
                </StyledButton>
            </Link>
        </Box>
    );
}
