"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { StyledButton } from "@/components/ui/StyledButton";
import { errorHandler } from "@/helpers/error/error.handler.helper";

interface Props {
    onCancel: () => Promise<void>;
}

export default function CancelPasswordChange({ onCancel }: Props) {
    const t = useTranslations();
    const [cancelling, setCancelling] = useState(false);

    const handleClick = async () => {
        setCancelling(true);
        try {
            await onCancel();
        } catch (error) {
            errorHandler({ error, t });
        } finally {
            setCancelling(false);
        }
    };

    return (
        <StyledButton
            variant="text"
            color="error"
            onClick={handleClick}
            loading={cancelling}
        >
            {t("pages.profile.settings.password.cancel")}
        </StyledButton>
    );
}
