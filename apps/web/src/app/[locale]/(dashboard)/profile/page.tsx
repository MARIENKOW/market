import BlogForm from "@/components/form/BlogForm";
import { ContainerComponent } from "@/components/ui/Container";
import { Box } from "@mui/material";

export default async function Page() {
    return (
        <Box mt={2} >
            <ContainerComponent>
                <BlogForm />
            </ContainerComponent>
        </Box>
    );
}
