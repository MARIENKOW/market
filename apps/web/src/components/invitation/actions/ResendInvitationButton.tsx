"use client";

import { CircularProgress } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useTranslations } from "next-intl";
import { StyledTooltip } from "@/components/ui/StyledTooltip";
import { StyledIconButton } from "@/components/ui/StyledIconButton";
import AdminInvitationService from "@/services/admin/invitation/adminInvitation.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { useQueryClient } from "@tanstack/react-query";
import { invitationKeys } from "@/lib/tanstack/keys";
import { AdminInvitationDto } from "@myorg/shared/dto";

const service = new AdminInvitationService($apiAdminClient);

interface Props {
    invId: AdminInvitationDto["id"];
}

export function ResendInvitationButton({ invId }: Props) {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const handle = async () => {
        setLoading(true);
        try {
            const { data } = await service.resend(invId);
            queryClient.invalidateQueries({ queryKey: invitationKeys.all });
            snackbarSuccess(
                t("pages.admin.invitation.feedback.resent", {
                    email: data.email,
                }),
            );
        } catch (error) {
            errorHandler({ error, t });
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledTooltip
            title={t("pages.admin.invitation.actions.resend")}
            placement="top"
        >
            <span>
                <StyledIconButton
                    size="small"
                    onClick={handle}
                    disabled={loading}
                    color="primary"
                >
                    {loading ? (
                        <CircularProgress size={16} />
                    ) : (
                        <SendIcon fontSize="small" />
                    )}
                </StyledIconButton>
            </span>
        </StyledTooltip>
    );
}
