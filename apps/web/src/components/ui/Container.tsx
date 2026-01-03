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
                pt: { xs: 0 },
                pb: { xs: 0 },
                pl: { xs: 1, md: 2 },
                pr: { xs: 1, md: 2 },
            }}
        >
            {children}
        </Container>
    );
};
