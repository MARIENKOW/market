"use client";

import { CircularProgress } from "@mui/material";
import { useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useTranslations } from "next-intl";
import { StyledTooltip } from "@/components/ui/StyledTooltip";
import { StyledIconButton } from "@/components/ui/StyledIconButton";
import AdminInvitationService from "@/services/admin/invitation/adminInvitation.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { invitationKeys } from "@/lib/tanstack/keys";
import { useQueryClient } from "@tanstack/react-query";
import { AdminInvitationDto } from "@myorg/shared/dto";

const service = new AdminInvitationService($apiAdminClient);

interface Props {
    invId: AdminInvitationDto["id"];
}

export function UnrevokeInvitationButton({ invId }: Props) {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const handle = async () => {
        setLoading(true);
        try {
            await service.unrevoke(invId);
            queryClient.invalidateQueries({ queryKey: invitationKeys.all });
            snackbarSuccess(t("pages.admin.invitation.feedback.unrevoked"));
        } catch (error) {
            errorHandler({ error, t });
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledTooltip
            title={t("pages.admin.invitation.actions.unrevoke")}
            placement="top"
        >
            <span>
                <StyledIconButton
                    size="small"
                    onClick={handle}
                    disabled={loading}
                    color="success"
                >
                    {loading ? (
                        <CircularProgress size={16} />
                    ) : (
                        <LockOpenIcon fontSize="small" />
                    )}
                </StyledIconButton>
            </span>
        </StyledTooltip>
    );
}
