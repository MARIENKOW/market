import Header from "@/components/layout/Header";
import { Box } from "@mui/material";
import React from "react";

type RootMainLayoutType = {
    children: React.ReactNode;
};

export default function RootMainLayout({ children }: RootMainLayoutType) {
    return (
        <Box flex={1} display={"flex"} flexDirection={"column"}>
            <Header />
            <Box flex={1} display={"flex"} flexDirection={"column"}>
                {children}
            </Box>
        </Box>
    );
}
