"use client";

import { useState } from "react";
import {
    Box,
    DialogContent,
    DialogTitle,
    LinearProgress,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { useTranslations } from "next-intl";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { StyledButton } from "@/components/ui/StyledButton";
import { StyledIconButton } from "@/components/ui/StyledIconButton";
import { StyledTypography } from "@/components/ui/StyledTypography";
import { StyledTooltip } from "@/components/ui/StyledTooltip";
import { StyledDialog } from "@/components/ui/StyledDialog";
import {
    useAdminInvitations,
    defaultInvitationParams,
} from "@/hooks/tanstack/useAdminInvitations";
import { usePageClamp } from "@/hooks/tanstack/usePageClamp";
import { InvitationParams } from "@/lib/tanstack/listDefaults";
import AdminInvitationCreateForm from "@/components/form/AdminInvitationCreateForm";
import { InvitationList } from "@/app/[locale]/admin/(dashboard)/(dashboard)/invitations/InvitationList";
import { PaginationComponent } from "@/components/common/PaginationComponent";
import { SearchField } from "@/components/common/SearchField";
import { useUrlListState } from "@/hooks/tanstack/useUrlListState";

const STATUS_OPTIONS: {
    value: InvitationParams["status"];
    color: "standard" | "success" | "warning" | "error";
}[] = [
    { value: "all", color: "standard" },
    { value: "active", color: "success" },
    { value: "expired", color: "warning" },
    { value: "revoked", color: "error" },
];

export default function InvitationComponent() {
    const t = useTranslations();
    const { page, setPage, filters, setFilter } = useUrlListState(
        defaultInvitationParams,
    );
    const { data, isFetching, error, refetch } = useAdminInvitations({
        page,
        ...filters,
    });
    usePageClamp(page, data?.meta.pageCount, setPage);
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <Box display="flex" flexDirection="column" flex={1} height="100%">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems={{ xs: "initial", sm: "center" }}
                mb={2}
                flexDirection={{ xs: "column", sm: "row" }}
                gap={1}
            >
                <Box display={"flex"} alignItems={"center"} gap={1}>
                    <StyledTypography variant="h5" fontWeight={700}>
                        {t("pages.admin.invitation.name")}
                        {data?.meta.total ? ` · ${data.meta.total}` : ""}
                    </StyledTypography>
                    <StyledTooltip title={t("common.refresh")} placement="top">
                        <span>
                            <StyledIconButton
                                onClick={() => refetch()}
                                loading={isFetching}
                            >
                                <RefreshIcon />
                            </StyledIconButton>
                        </span>
                    </StyledTooltip>
                </Box>
            </Box>
            <Box mb={2}>
                <SearchField
                    value={filters.query}
                    onChange={(v) => setFilter("query", v)}
                />
            </Box>

            <Box
                mb={2}
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                alignItems={{ xs: "initial", sm: "center" }}
                gap={1}
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <ToggleButtonGroup
                        value={filters.status}
                        exclusive
                        onChange={(_, v) => {
                            if (v !== null) setFilter("status", v);
                        }}
                        size="small"
                    >
                        {STATUS_OPTIONS.map(({ value, color }) => (
                            <ToggleButton
                                key={value}
                                value={value}
                                color={color}
                            >
                                {t(`pages.admin.invitation.status.${value}`)}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <StyledTooltip
                        title={t(
                            filters.order === "desc"
                                ? "common.sortNewest"
                                : "common.sortOldest",
                        )}
                        placement="top"
                    >
                        <span>
                            <StyledIconButton
                                onClick={() =>
                                    setFilter(
                                        "order",
                                        filters.order === "desc"
                                            ? "asc"
                                            : "desc",
                                    )
                                }
                            >
                                {filters.order === "desc" ? (
                                    <ArrowDownwardIcon fontSize="small" />
                                ) : (
                                    <ArrowUpwardIcon fontSize="small" />
                                )}
                            </StyledIconButton>
                        </span>
                    </StyledTooltip>
                </Box>
                <Box>
                    <StyledButton
                        fullWidth
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

            <StyledDialog
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                fullWidth
                // slotProps={{ paper: { sx: { p: { xs: 0, sm: 1 } } } }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    {t("pages.admin.invitation.form.title")}
                </DialogTitle>
                <DialogContent sx={{ pt: "7px !important" }}>
                    <AdminInvitationCreateForm
                        onCancel={() => setCreateOpen(false)}
                    />
                </DialogContent>
            </StyledDialog>
        </Box>
    );
}
