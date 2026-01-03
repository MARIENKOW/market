import { Box } from "@mui/material";

export default function ErrorElement() {
    return (
        <Box
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
        >
            {"error"}
        </Box>
    );
}
