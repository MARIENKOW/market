import { NAV_GROUPS } from "@/app/[locale]/admin/(dashboard)/(dashboard)/nav.config";
import Sidebar from "@/components/layout/navigation/Sidebar";
import { Box } from "@mui/material";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";

export default async function Layout({
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
                <Sidebar
                    hidePaths={[FULL_PATH_ROUTE.admin.blog.create.path]}
                    minWidth={200}
                    config={NAV_GROUPS}
                />
            </Box>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {children}
            </Box>
        </Box>
    );
}
