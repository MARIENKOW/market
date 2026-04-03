"use client";

import DeleteAllVideoBlog from "@/app/[locale]/(dashboard)/video/DeleteAllVideoBlog";

import { VideoList } from "@/app/[locale]/(dashboard)/video/VideoList";
import VideoUploaderBlog from "@/app/[locale]/(dashboard)/video/VideoUploaderBlog";
import { StyledDivider } from "@/components/ui/StyledDivider";
import { useVideos } from "@/hooks/tanstack/useVideo";
import { Box, LinearProgress } from "@mui/material";

export default function VideoComponentBlog() {
    const { data, isLoading, isError, error, refetch, isPending, isFetching } =
        useVideos({
            page: 1,
        });
    return (
        <Box display="flex" flexDirection="column" flex={1} height="100%">
            <Box
                display={"flex"}
                p={2}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={1}
                flexWrap={"wrap"}
            >
                <VideoUploaderBlog />
                {data && data.length > 0 ? <DeleteAllVideoBlog /> : ""}
            </Box>
            <StyledDivider />
            <Box
                flex={1}
                display={"flex"}
                flexDirection={"column"}
                position={"relative"}
                p={2}
            >
                {isLoading && (
                    <LinearProgress
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                        }}
                    />
                )}
                <VideoList data={data} error={error} />
            </Box>
        </Box>
    );
}
