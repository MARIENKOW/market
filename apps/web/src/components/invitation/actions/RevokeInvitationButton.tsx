"use client";

import { CircularProgress } from "@mui/material";
import { useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import { useTranslations } from "next-intl";
import { StyledTooltip } from "@/components/ui/StyledTooltip";
import { StyledIconButton } from "@/components/ui/StyledIconButton";
import AdminInvitationService from "@/services/admin/invitation/adminInvitation.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { useConfirm } from "@/hooks/useConfirm";
import { invitationKeys } from "@/lib/tanstack/keys";
import { useQueryClient } from "@tanstack/react-query";
import { AdminInvitationDto } from "@myorg/shared/dto";

const service = new AdminInvitationService($apiAdminClient);

interface Props {
    invId: AdminInvitationDto["id"];
}

export function RevokeInvitationButton({ invId }: Props) {
    const t = useTranslations();
    const { confirm, confirmDialog } = useConfirm();
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const handle = async () => {
        const ok = await confirm();
        if (!ok) return;
        setLoading(true);
        try {
            await service.revoke(invId);
            queryClient.invalidateQueries({ queryKey: invitationKeys.all });
            snackbarSuccess(t("pages.admin.invitation.feedback.revoked"));
        } catch (error) {
            errorHandler({ error, t });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {confirmDialog}
            <StyledTooltip
                title={t("pages.admin.invitation.actions.revoke")}
                placement="top"
            >
                <span>
                    <StyledIconButton
                        size="small"
                        onClick={handle}
                        disabled={loading}
                        color="warning"
                    >
                        {loading ? (
                            <CircularProgress size={16} />
                        ) : (
                            <BlockIcon fontSize="small" />
                        )}
                    </StyledIconButton>
                </span>
            </StyledTooltip>
        </>
    );
}
