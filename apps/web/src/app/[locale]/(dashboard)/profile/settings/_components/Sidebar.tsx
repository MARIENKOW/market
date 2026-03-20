"use client";

import { Box } from "@mui/material";
import { NAV_GROUPS } from "./nav.config";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import { StyledDivider } from "@/components/ui/StyledDivider";
import { StyledList } from "@/components/ui/StyledList";
import { StyledListItemIcon } from "@/components/ui/StyledListItemIcon";
import { StyledListItemText } from "@/components/ui/StyledListItemText";
import { StyledListItemButton } from "@/components/ui/StyledListItemButton";

export function Sidebar() {
    const pathname = usePathname();
    const t = useTranslations();

    return (
        <Box
            display={"inline-flex"}
            minWidth={250}
            flexDirection={"column"}
            sx={{ px: 1 }}
        >
            <StyledTypography
                variant="h6"
                sx={{ px: 1, my: 2, fontWeight: 700 }}
            >
                {t("pages.profile.settings.name")}
            </StyledTypography>

            <Box display={"flex"} flexDirection={"column"} gap={2}>
                {NAV_GROUPS.map((group, gi) => (
                    <Box key={gi}>
                        <StyledTypography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                px: 1,
                                mb: 0.5,
                                display: "block",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                            }}
                        >
                            {t(group.label)}
                        </StyledTypography>

                        <StyledList dense disablePadding>
                            {group.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link href={item.href} key={item.label}>
                                        <StyledListItemButton
                                            key={item.label}
                                            selected={isActive}
                                            sx={{
                                                borderRadius: 2,
                                                mb: 0.5,
                                            }}
                                        >
                                            <StyledListItemIcon
                                                sx={{
                                                    minWidth: 36,
                                                    color: "text.secondary",
                                                }}
                                            >
                                                {item.icon}
                                            </StyledListItemIcon>
                                            <StyledListItemText
                                                primary={t(item.label)}
                                            />
                                        </StyledListItemButton>
                                    </Link>
                                );
                            })}
                        </StyledList>

                        {gi < NAV_GROUPS.length - 1 && (
                            <StyledDivider sx={{ mt: 1.5 }} />
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
