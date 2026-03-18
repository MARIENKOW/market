import Header from "@/components/layout/header/user/HeaderUser";
import UserAuthProvider from "@/components/wrappers/auth/UserAuthProvider";
import { getUserAuth } from "@/utils/cache/user.cache.me";
import { Box } from "@mui/material";
import React from "react";

type RootMainLayoutType = {
    children: React.ReactNode;
};

export default async function UserLayout({ children }: RootMainLayoutType) {
    const { user, error } = await getUserAuth();
    return (
        <UserAuthProvider user={user} error={error}>
            <Box flex={1} display={"flex"} flexDirection={"column"}>
                <Header />
                <Box flex={1} display={"flex"} flexDirection={"column"}>
                    {children}
                </Box>
            </Box>
        </UserAuthProvider>
    );
}
