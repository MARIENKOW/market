"use client";

import DeleteAllImageBlog from "@/components/TextEditor/components/image/DeleteAllImageBlog";
import { ImageList } from "@/components/TextEditor/components/image/ImageList";
import { PaginationComponent } from "@/components/common/PaginationComponent";
import { BlogImageUploader } from "@/components/features/Uploader/BlogImageUploader";
import { StyledDivider } from "@/components/ui/StyledDivider";
import { useImages } from "@/hooks/tanstack/useImage";
import { Box, LinearProgress } from "@mui/material";

export default function ImageComponentBlog() {
    const { data, error, isFetching, page, setPage } = useImages();

    return (
        <Box display="flex" flexDirection="column" flex={1} height="100%">
            <Box
                display="flex"
                p={2}
                justifyContent="space-between"
                alignItems="center"
                gap={1}
                flexWrap="wrap"
            >
                <BlogImageUploader />
                {data && data.data.length > 0 ? <DeleteAllImageBlog /> : ""}
            </Box>
            <StyledDivider />
            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                position="relative"
                gap={2}
                p={2}
            >
                {isFetching && (
                    <LinearProgress sx={{ position: "absolute", top: 0, left: 0, width: "100%" }} />
                )}
                <ImageList data={data?.data} error={error} />
                <PaginationComponent
                    page={page}
                    count={data?.meta.pageCount ?? 1}
                    onChange={setPage}
                    disabled={isFetching}
                />
            </Box>
        </Box>
    );
}
