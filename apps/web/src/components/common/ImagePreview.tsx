import { StyledIconButton } from "@/components/ui/StyledIconButton";
import { Box } from "@mui/material";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";

export default function ImagePreview({
    src,
    onDelete,
}: {
    src: string;
    onDelete: () => void;
}) {
    return (
        <Box
            overflow={"hidden"}
            borderRadius={2}
            flex={1}
            height={"100%"}
            position={"relative"}
            width={"100%"}
        >
            <Box
                component={"img"}
                sx={{ objectFit: "cover" }}
                height={"100%"}
                width={"100%"}
                src={src}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    zIndex: 10,
                    background: "background",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    padding: "1px",
                }}
            >
                <StyledIconButton
                    size="small"
                    sx={{ p: "2px" }}
                    onClick={onDelete}
                >
                    <HighlightOffTwoToneIcon color="error" />
                </StyledIconButton>
            </Box>
        </Box>
    );
}
