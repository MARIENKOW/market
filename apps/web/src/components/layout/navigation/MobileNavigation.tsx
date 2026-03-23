import { Box } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import { StyledPaper } from "@/components/ui/StyledPaper";
import { StyledListItemButton } from "@/components/ui/StyledListItemButton";
import { StyledDivider } from "@/components/ui/StyledDivider";
import { StyledListItemText } from "@/components/ui/StyledListItemText";
import { StyledListItemIcon } from "@/components/ui/StyledListItemIcon";
import { NavGroup } from "@/components/layout/navigation/types";

export default async function MobileNavigation({
    config,
}: {
    config: NavGroup[];
}) {
    const t = await getTranslations();
    return (
        <Box sx={{ p: 2 }}>
            <StyledTypography
                variant="h6"
                sx={{ px: 1, my: 2, fontWeight: 700 }}
            >
                {t("pages.profile.settings.name")}
            </StyledTypography>
            {config.map((group, gi) => (
                <Box key={gi} mb={2}>
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

                    <StyledPaper
                        elevation={0}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                            overflow: "hidden",
                        }}
                    >
                        {group.items.map((item, idx) => (
                            <Box key={item.label}>
                                <Link href={item.href}>
                                    <StyledListItemButton
                                        sx={{ borderRadius: 0, py: 1.5 }}
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

                                        <ChevronRight
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: 20,
                                            }}
                                        />
                                    </StyledListItemButton>
                                </Link>
                                {idx < group.items.length - 1 && (
                                    <StyledDivider />
                                )}
                            </Box>
                        ))}
                    </StyledPaper>
                </Box>
            ))}
        </Box>
    );
}
