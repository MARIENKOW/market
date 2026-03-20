import { Box, Paper, Divider } from "@mui/material";
import { Sidebar } from "./_components/Sidebar";
import { MobileNav } from "./_components/Mobilenav";

export default async function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box flex={1} display={"flex"} flexDirection={"column"}>
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    border: "1px solid",
                    borderColor: "divider",
                    flex: 1,
                }}
            >
                <Box
                    sx={{
                        borderRight: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Sidebar />
                </Box>
                <Box sx={{ flex: 1, overflowY: "auto" }}>{children}</Box>
            </Box>

            <Box
                sx={{
                    display: { xs: "flex", md: "none" },
                    flexDirection: "column",
                }}
            >
                <MobileNav />
                <Divider />
                <Box sx={{ flex: 1 }}>{children}</Box>
            </Box>
        </Box>
    );
}
