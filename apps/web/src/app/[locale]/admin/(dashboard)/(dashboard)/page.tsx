import BlogPage from "@/app/[locale]/admin/(dashboard)/(dashboard)/blog/BlogPage";
import { NAV_GROUPS } from "@/app/[locale]/admin/(dashboard)/(dashboard)/nav.config";
import { NAV_GROUPS as NAV_GROUPS_SETTINGS } from "@/app/[locale]/admin/(dashboard)/settings/nav.config";
import SettingsPage from "@/app/[locale]/admin/(dashboard)/settings/SettingsPage";
import MobileNavigation from "@/components/layout/navigation/MobileNavigation";
import Sidebar from "@/components/layout/navigation/Sidebar";
import { Box } from "@mui/material";

export default function AdminHome() {
    return (
        <>
            <Box
                flex={1}
                flexDirection={"column"}
                sx={{ display: { xs: "none", md: "flex" } }}
            >
                <BlogPage />
            </Box>

            <Box
                flex={1}
                flexDirection={"column"}
                sx={{ display: { xs: "flex", md: "none" } }}
            >
                <MobileNavigation
                    // label="pages.admin.settings.name"
                    config={NAV_GROUPS}
                />
            </Box>
        </>
    );
}
