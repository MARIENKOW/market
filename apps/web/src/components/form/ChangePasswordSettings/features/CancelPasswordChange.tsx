"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { StyledButton } from "@/components/ui/StyledButton";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { FetchCustomReturn } from "@/utils/api";

interface Props {
    onCancel: () => void;
    onCancelRequest: () => FetchCustomReturn<void>;
}

export default function CancelPasswordChange({
    onCancel,
    onCancelRequest,
}: Props) {
    const t = useTranslations();
    const [cancelling, setCancelling] = useState(false);

    const handleClick = async () => {
        setCancelling(true);
        try {
            await onCancelRequest();
            onCancel();
        } catch (error) {
            errorHandler({
                error,
                t,
                fallback: {
                    notfound: {
                        callback: onCancel,
                    },
                },
            });
        } finally {
            setCancelling(false);
        }
    };

    return (
        <StyledButton
            variant="outlined"
            color="error"
            size="small"
            onClick={handleClick}
            loading={cancelling}
        >
            {t("features.changePassword.cancel")}
        </StyledButton>
    );
}
