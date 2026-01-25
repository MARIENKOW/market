"use client";

import { StyledButton } from "@/components/ui/StyledButton";
import { snackbarError } from "@/utils/snackbar/snackbar.error";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { useRouter } from "@/i18n/navigation";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { $apiClient } from "@/lib/api/fetch.client";
import { errorHandlerSnackbar } from "@/helpers/error/error.form.helper";

const user = new AuthUserService($apiClient);

export default function LogoutButton() {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        setLoading(true);
        try {
            await user.logout();
            router.refresh();
            snackbarSuccess(t("features.logout.success"));
        } catch (error) {
            errorHandlerSnackbar({
                error,
                t,
                fallback: { root: "features.logout.error" },
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <StyledButton loading={loading} onClick={handleClick}>
            {t("features.logout.name")}
        </StyledButton>
    );
}
