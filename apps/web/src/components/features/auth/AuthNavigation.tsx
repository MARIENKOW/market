"use client";

import LogoutButton from "@/components/features/auth/LogoutButton";
import SignOutButton from "@/components/features/auth/LogoutButton";
import LoadingElement from "@/components/feedback/LoadingElement";
import SkeletonAuthHeader from "@/components/skeletons/auth/SkeletonAuthHeader";
import { StyledButton } from "@/components/ui/StyledButton";
import { Link } from "@/i18n/navigation";
import { Box } from "@mui/material";
import { UserDto } from "@myorg/shared/dto";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { error } from "console";
import { useTranslations } from "next-intl";

export default function AuthNavigation({
    user,
    error,
}: {
    user: UserDto | null;
    error: boolean;
}) {
    const t = useTranslations();
    if (error) return <SkeletonAuthHeader />;
    if (!!user) return <LogoutButton />;

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
