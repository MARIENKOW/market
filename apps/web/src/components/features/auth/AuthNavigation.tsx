"use client";

import SignOutButton from "@/components/features/auth/SignOutButton";
import LoadingElement from "@/components/feedback/LoadingElement";
import { StyledButton } from "@/components/ui/StyledButton";
import { Link } from "@/i18n/navigation";
import { Box } from "@mui/material";
import { route } from "@myorg/shared/route";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function AuthNavigation() {
    const t = useTranslations();
    const session = useSession();
    if (session.status === "loading") return <LoadingElement />;
    if (session.status === "unauthenticated")
        return (
            <Box display={'flex'} gap={1} >
                <Link href={route.public.signin}>
                    <StyledButton variant="contained">
                        {t("pages.signin.name")}
                    </StyledButton>
                </Link>
                <Link href={route.public.signup}>
                    <StyledButton>{t("pages.signup.name")}</StyledButton>
                </Link>
            </Box>
        );
    return <SignOutButton />;
}
