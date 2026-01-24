"use client";

import { StyledButton } from "@/components/ui/StyledButton";
import { snackbarError } from "@/utils/snackbar/snackbar.error";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { useRouter } from "@/i18n/navigation";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { $apiClient } from "@/lib/api/fetch.client";

const user = new AuthUserService($apiClient);

export default function LogoutErrorButton() {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        setLoading(true);
        try {
            await user.logout();
            router.refresh();
            snackbarSuccess(t("features.logoutErr.success"));
        } catch (error) {
            console.log(error);
            snackbarError(t("features.logoutErr.error"));
        } finally {
            setLoading(false);
        }
    };
    return (
        <StyledButton variant='outlined' loading={loading} onClick={handleClick}>
            {t("features.logoutErr.name")}
        </StyledButton>
    );
}
