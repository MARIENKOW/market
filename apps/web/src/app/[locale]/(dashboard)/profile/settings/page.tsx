import { Box } from "@mui/material";
import MobileNavigation from "@/app/[locale]/(dashboard)/profile/settings/components/MobileNavigation";
import ProfilePage from "@/app/[locale]/(dashboard)/profile/settings/ProfilePage";

export default async function Page() {
    return (
        <>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
                <ProfilePage />
            </Box>

            <Box sx={{ display: { xs: "block", md: "none" } }}>
                <MobileNavigation />
            </Box>
        </>
    );
}
