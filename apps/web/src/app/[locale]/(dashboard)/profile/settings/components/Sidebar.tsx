import { Box } from "@mui/material";
import { NAV_GROUPS } from "./nav.config";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import { StyledDivider } from "@/components/ui/StyledDivider";
import { StyledList } from "@/components/ui/StyledList";
import SidebarLink from "@/app/[locale]/(dashboard)/profile/settings/components/SidebarLink";
import { getTranslations } from "next-intl/server";

export default async function Sidebar() {
    const t = await getTranslations();

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
                            {group.items.map((item) => (
                                <SidebarLink key={item.label} item={item} />
                            ))}
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
