import { NAV_GROUPS } from "@/app/[locale]/admin/(dashboard)/(dashboard)/nav.config";
import HeaderAdmin from "@/components/layout/header/admin/HeaderAdmin";
import Sidebar from "@/components/layout/navigation/Sidebar";
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
            {children}
        </AdminPrivateWrapper>
    );
}
