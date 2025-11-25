import { Container } from "@mui/material";
import React from "react";

export const ContainerComponent = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <Container
            maxWidth={"lg"}
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                p: { xs: 2 },
            }}
        >
            {children}
        </Container>
    );
};
