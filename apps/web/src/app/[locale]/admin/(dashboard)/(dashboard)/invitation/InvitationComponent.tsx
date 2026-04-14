"use client";

import { useState } from "react";
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import RefreshIcon from "@mui/icons-material/Refresh";
import { StyledButton } from "@/components/ui/StyledButton";
import { StyledIconButton } from "@/components/ui/StyledIconButton";
import { StyledTypography } from "@/components/ui/StyledTypography";
import { StyledTooltip } from "@/components/ui/StyledTooltip";
import { useAdminInvitations } from "@/hooks/tanstack/useAdminInvitations";
import AdminInvitationCreateForm from "@/components/form/AdminInvitationCreateForm";
import { InvitationList } from "@/app/[locale]/admin/(dashboard)/(dashboard)/invitation/InvitationList";
import { PaginationComponent } from "@/components/common/PaginationComponent";

export default function InvitationComponent() {
    const t = useTranslations();
    const { data, isFetching, error, page, setPage, refetch } =
        useAdminInvitations();
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <Box display="flex" flexDirection="column" flex={1} height="100%">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                flexWrap="wrap"
                gap={1}
            >
                <StyledTypography variant="h5" fontWeight={700}>
                    {t("pages.admin.invitation.name")}
                    {data?.meta.total ? ` · ${data.meta.total}` : ""}
                </StyledTypography>
                <Box display="flex" alignItems="center" gap={1}>
                    <StyledTooltip title={t("common.refresh")} placement="top">
                        <StyledIconButton
                            onClick={() => refetch()}
                            loading={isFetching}
                        >
                            <RefreshIcon />
                        </StyledIconButton>
                    </StyledTooltip>
                    <StyledButton
                        variant="contained"
                        onClick={() => setCreateOpen(true)}
                    >
                        {t("pages.admin.invitation.actions.create")}
                    </StyledButton>
                </Box>
            </Box>

            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                position="relative"
                gap={2}
                py={2}
            >
                {isFetching && (
                    <LinearProgress
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                        }}
                    />
                )}
                <InvitationList data={data?.data} error={error} />
                <PaginationComponent
                    page={page}
                    count={data?.meta.pageCount ?? 1}
                    onChange={setPage}
                    disabled={isFetching}
                />
            </Box>

            <AdminInvitationCreateForm
                open={createOpen}
                onClose={() => setCreateOpen(false)}
            />
        </Box>
    );
}
