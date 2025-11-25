import UserSignUp from "@/components/form/UserSignUp";
import { LanguageChange } from "@/components/blocks/LanguageChange";
import { ContainerComponent } from "@/components/ui/Container";
import { Box } from "@mui/material";

export default function Page() {
    return (
        <ContainerComponent>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flex={1}
            >
                <Box
                    flex={"0 1 350px"}
                    display={"flex"}
                    flexDirection={"column"}
                >
                    <LanguageChange />
                    <UserSignUp />;
                </Box>
            </Box>
        </ContainerComponent>
    );
}
