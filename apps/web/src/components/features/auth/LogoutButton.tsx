"use client";

import { StyledButton } from "@/components/ui/StyledButton";
import { snackbarError } from "@/helpers/snackbar/snackbar.error";
import { snackbarSuccess } from "@/helpers/snackbar/snackbar.success";
import { useRouter } from "@/i18n/navigation";
import { $apiUserClient } from "@/lib/api/fetch.user.client";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { useTranslations } from "next-intl";
import { useState } from "react";

const user = new AuthUserService($apiUserClient);

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
            console.log(error);
            const router = useRouter();
            router.refresh();
            snackbarError(t("features.logout.error"));
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
