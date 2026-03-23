import { Box } from "@mui/material";
import MobileNavigation from "@/components/layout/navigation/MobileNavigation";
import ProfilePage from "@/app/[locale]/(dashboard)/profile/settings/ProfilePage";
import { NAV_GROUPS } from "@/app/[locale]/admin/(dashboard)/settings/nav.config";

export default async function Page() {
    return (
        <>
            <Box
                flex={1}
                flexDirection={"column"}
                sx={{ display: { xs: "none", md: "flex" } }}
            >
                <ProfilePage />
            </Box>

            <Box
                flex={1}
                flexDirection={"column"}
                sx={{ display: { xs: "flex", md: "none" } }}
            >
                <MobileNavigation config={NAV_GROUPS} />
            </Box>
        </>
    );
}
