"use client";

import DeleteAllVideoBlog from "@/app/[locale]/(dashboard)/video/DeleteAllVideoBlog";
import { VideoList } from "@/app/[locale]/(dashboard)/video/VideoList";
import { PaginationComponent } from "@/components/common/PaginationComponent";
import { BlogVideoUploader } from "@/components/features/Uploader/BlogVideoUploader";
import { StyledDivider } from "@/components/ui/StyledDivider";
import { useVideos } from "@/hooks/tanstack/useVideo";
import { Box, LinearProgress } from "@mui/material";

export default function VideoComponentBlog() {
    const { data,  error, isFetching, page, setPage } = useVideos();
    console.log(data);

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
                <BlogVideoUploader />
                {data && data.data.length > 0 ? <DeleteAllVideoBlog /> : ""}
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
                    <LinearProgress
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                        }}
                    />
                )}

                <VideoList data={data?.data} error={error} />
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
