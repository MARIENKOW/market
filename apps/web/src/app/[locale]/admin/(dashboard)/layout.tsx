import HeaderAdmin from "@/components/layout/header/admin/HeaderAdmin";
import AdminPrivateWrapper from "@/components/wrappers/auth/AdminPrivateWrapper";
import { Box } from "@mui/material";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminPrivateWrapper>
            <HeaderAdmin />
            <Box display={"flex"} flexDirection={"column"} flex={1}>
                {children}
            </Box>
        </AdminPrivateWrapper>
    );
}
