"use client";

import SignOutButton from "@/components/features/auth/SignOutButton";
import LoadingElement from "@/components/feedback/LoadingElement";
import { StyledButton } from "@/components/ui/StyledButton";
import { Link } from "@/i18n/navigation";
import { Box } from "@mui/material";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { useTranslations } from "next-intl";


export default function AuthNavigation() {
    const t = useTranslations();

    return (
        <Box display={"flex"} gap={1}>
            <Link href={FULL_PATH_ROUTE.login.path}>
                <StyledButton variant="contained">
                    {t("pages.login.name")}
                </StyledButton>
            </Link>
            <Link href={FULL_PATH_ROUTE.register.path}>
                <StyledButton>{t("pages.register.name")}</StyledButton>
            </Link>
        </Box>
    );
}
