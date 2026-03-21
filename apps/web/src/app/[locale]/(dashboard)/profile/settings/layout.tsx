import Sidebar from "@/app/[locale]/(dashboard)/profile/settings/components/Sidebar";
import { Box } from "@mui/material";

export default async function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flex: 1,
            }}
        >
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    borderRight: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Sidebar />
            </Box>
            <Box sx={{ flex: 1 }}>{children}</Box>
        </Box>
    );
}
