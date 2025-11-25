import { ContainerComponent } from "@/components/ui/Container";
import { Box, Toolbar } from "@mui/material";

export default function Header() {
    return (
        <Box position={"fixed"} top={0} left={0} width={"100%"} zIndex={1000}>
            <ContainerComponent>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                    }}
                ></Toolbar>
            </ContainerComponent>
        </Box>
    );
}
