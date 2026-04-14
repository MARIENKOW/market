"use client";

import { Box, Card, CardContent } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { AdminInvitationDto } from "@myorg/shared/dto";
import { useTranslations } from "next-intl";
import { CopyToClipboard } from "@/components/features/CopyToClipboard";
import { InvitationNote } from "@/components/invitation/InvitationNote";
import { StyledDivider } from "@/components/ui/StyledDivider";
import { ResendInvitationButton } from "@/components/invitation/actions/ResendInvitationButton";
import { RevokeInvitationButton } from "@/components/invitation/actions/RevokeInvitationButton";
import { UnrevokeInvitationButton } from "@/components/invitation/actions/UnrevokeInvitationButton";
import { DeleteInvitationButton } from "@/components/invitation/actions/DeleteInvitationButton";
import { StyledTypography } from "@/components/ui/StyledTypography";
import { StyledChip } from "@/components/ui/StyledChip";

function StatusChip({ inv }: { inv: AdminInvitationDto }) {
    const t = useTranslations();
    if (inv.isRevoked)
        return (
            <StyledChip
                label={t("pages.admin.invitation.status.revoked")}
                size="small"
                color="error"
                variant="outlined"
            />
        );
    if (inv.isExpired)
        return (
            <StyledChip
                label={t("pages.admin.invitation.status.expired")}
                size="small"
                color="warning"
                variant="outlined"
            />
        );
    return (
        <StyledChip
            label={t("pages.admin.invitation.status.active")}
            size="small"
            color="success"
            variant="outlined"
        />
    );
}

function ExpiryLabel({ inv }: { inv: AdminInvitationDto }) {
    const t = useTranslations();
    const key = inv.isRevoked
        ? "pages.admin.invitation.revokedAt"
        : inv.isExpired
          ? "pages.admin.invitation.expiredAt"
          : "pages.admin.invitation.expiresAt";

    return (
        <StyledTypography
            variant="caption"
            color={inv.isExpired ? "warning.main" : "text.disabled"}
        >
            {t(key, { time: inv.timeLabel })}
        </StyledTypography>
    );
}

export default function InvitationItem({ inv }: { inv: AdminInvitationDto }) {
    const t = useTranslations();

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 2,
                borderColor: inv.isRevoked
                    ? "error.main"
                    : inv.isExpired
                      ? "warning.main"
                      : "success.main",
                opacity: inv.isRevoked || inv.isExpired ? 0.75 : 1,
                transition: "border-color 0.2s",
            }}
        >
            <CardContent sx={{ p: "12px 16px !important" }}>
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    flexWrap="wrap"
                    mb={1.5}
                >
                    <EmailIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                    />
                    <StyledTypography
                        variant="body2"
                        fontWeight={600}
                        sx={{ flex: 1, wordBreak: "break-all" }}
                    >
                        {inv.email}
                    </StyledTypography>
                    <StatusChip inv={inv} />
                </Box>

                <Box mb={1.5}>
                    <ExpiryLabel inv={inv} />
                </Box>

                <CopyToClipboard
                    value={inv.url}
                    successMessage={t("pages.admin.invitation.linkCopied")}
                    disabled={inv.isRevoked || inv.isExpired}
                />

                <Box mt={1.5}>
                    <InvitationNote inv={inv} />
                </Box>

                <StyledDivider sx={{ mt: 1.5, mb: 0.5 }} />
                <Box display="flex" justifyContent="flex-end" gap={0.5}>
                    {!inv.isRevoked && (
                        <ResendInvitationButton invId={inv.id} />
                    )}
                    {!inv.isRevoked && (
                        <RevokeInvitationButton invId={inv.id} />
                    )}
                    {inv.isRevoked && (
                        <UnrevokeInvitationButton invId={inv.id} />
                    )}
                    <DeleteInvitationButton invId={inv.id} />
                </Box>
            </CardContent>
        </Card>
    );
}
