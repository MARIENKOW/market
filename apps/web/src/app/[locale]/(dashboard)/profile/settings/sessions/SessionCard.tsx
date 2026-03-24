"use client";

import {
    Box,
    Typography,
    IconButton,
    Chip,
    Tooltip,
    alpha,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Close, AccessTime, Shield } from "@mui/icons-material";
import { useLocale, useTranslations } from "next-intl";
import { SessionUserViewDto } from "@myorg/shared/dto";
import { OsIcon } from "./icons/OsIcon";
import { DeviceIcon } from "./icons/DeviceIcon";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import { StyledButton } from "@/components/ui/StyledButton";
import { relativeTime } from "@/utils/relativeTime";

interface SessionCardProps {
    session: SessionUserViewDto;
}

export const SessionCard = ({ session }: SessionCardProps) => {
    const theme = useTheme();
    const locale = useLocale();
    const t = useTranslations("components.sessionList");
    const { device, location, isCurrent, lastUsedAt, id } = session;

    const date = new Date(Math.min(new Date(lastUsedAt).getTime(), Date.now()));

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                p: 2,
                borderRadius: 3,
                border: "1px solid",
                borderColor: isCurrent
                    ? alpha(theme.palette.primary.main, 0.4)
                    : "divider",
                bgcolor: isCurrent
                    ? alpha(theme.palette.primary.main, 0.08)
                    : "background.paper",
            }}
        >
            {/* Иконка устройства */}
            <Box
                sx={{
                    width: { xs: 68, sm: 48 },
                    height: { xs: 68, sm: 48 },
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    bgcolor: isCurrent
                        ? alpha(theme.palette.primary.main, 0.1)
                        : alpha(theme.palette.text.primary, 0.05),
                    color: isCurrent ? "primary.main" : "text.secondary",
                }}
            >
                <DeviceIcon
                    type={device.type}
                    sx={{ fontSize: { xs: 48, sm: 24 } }}
                />
            </Box>

            {/* Основная информация */}
            <Box
                display={"flex"}
                flexDirection={"column"}
                gap={1}
                sx={{ flex: 1, minWidth: 0 }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1, sm: 2 },
                        flexDirection: { xs: "column", sm: "row" },
                        flexWrap: "wrap",
                    }}
                >
                    {isCurrent && (
                        <Chip
                            icon={
                                <Shield sx={{ fontSize: "12px !important" }} />
                            }
                            label={t("thisDevice")}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{
                                display: { xs: "flex", sm: "none" },
                                height: 20,
                                fontSize: 11,
                                fontWeight: 600,
                                "& .MuiChip-label": { px: 0.75, lineHeight: 2 },
                                "& .MuiChip-icon": { ml: 0.5, mr: 0 },
                            }}
                        />
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                        }}
                    >
                        <StyledTypography
                            variant="body2"
                            fontWeight={600}
                            sx={{ lineHeight: 1.3 }}
                            noWrap
                        >
                            {device.browser}
                        </StyledTypography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                color: "text.secondary",
                            }}
                        >
                            <OsIcon icon={device.icon} size={14} />
                            <StyledTypography
                                variant="caption"
                                color="text.secondary"
                                noWrap
                            >
                                {device.os}
                            </StyledTypography>
                        </Box>
                    </Box>

                    {isCurrent && (
                        <Chip
                            icon={
                                <Shield sx={{ fontSize: "12px !important" }} />
                            }
                            label={t("thisDevice")}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{
                                display: { xs: "none", sm: "flex" },
                                height: 20,
                                fontSize: 11,
                                fontWeight: 600,
                                "& .MuiChip-label": { px: 0.75, lineHeight: 1 },
                                "& .MuiChip-icon": { ml: 0.5, mr: 0 },
                            }}
                        />
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flexWrap: "wrap",
                    }}
                >
                    {/* Геолокация */}
                    <StyledTypography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                        {[location.city, location.country]
                            .filter(Boolean)
                            .join(", ") || location.ip}
                    </StyledTypography>

                    <Box
                        component="span"
                        sx={{
                            width: 3,
                            height: 3,
                            borderRadius: "50%",
                            bgcolor: "text.disabled",
                            flexShrink: 0,
                        }}
                    />

                    {/* Последняя активность */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            color: "text.secondary",
                        }}
                    >
                        <AccessTime sx={{ fontSize: 12 }} />
                        <Tooltip
                            title={new Date(lastUsedAt).toLocaleString()}
                            placement="top"
                            arrow
                        >
                            <Typography
                                component="span"
                                variant="caption"
                                sx={{ cursor: "default" }}
                            >
                                {relativeTime({
                                    date,
                                    locale,
                                })}
                            </Typography>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>

            {/* Кнопка завершить */}
            {!isCurrent && (
                <>
                    <StyledButton
                        sx={{ display: { xs: "flex", sm: "none" } }}
                        fullWidth
                        size="small"
                        variant={"outlined"}
                        color="error"
                    >
                        {t("revokeSession")}
                    </StyledButton>
                    <StyledButton
                        sx={{ display: { xs: "none", sm: "flex" } }}
                        size="small"
                        variant={"text"}
                        color="error"
                    >
                        {t("revokeSession")}
                    </StyledButton>
                </>
            )}
        </Box>
    );
};
