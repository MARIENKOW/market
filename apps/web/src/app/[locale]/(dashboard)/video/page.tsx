import { Box, Stack, Divider, Grid } from "@mui/material";
import BlogVideoService from "@/services/blog/video/blogVideo.service";
import { VideoDto } from "@myorg/shared/dto";
import { VideoControll } from "@/app/[locale]/(dashboard)/video/VideoControll";
import ErrorHandlerElement from "@/components/feedback/error/ErrorHandlerElement";
import EmptyElement from "@/components/feedback/EmptyElement";
import VideoUploaderBlog from "@/app/[locale]/(dashboard)/video/VideoUploaderBlog";
import { $apiAxiosServer } from "@/utils/api/axios.server";
import { StyledDivider } from "@/components/ui/StyledDivider";
import DeleteAllVideoBlog from "@/app/[locale]/(dashboard)/video/DeleteAllVideoBlog";

const { getAll } = new BlogVideoService($apiAxiosServer);
export default async function Page() {
    let data: VideoDto[] = [];
    let error: unknown;
    try {
        const body = await getAll({ page: 1 });
        data = body.data;
    } catch (e) {
        error = e;
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            flex={1}
            height="100%"
            gap={2}
            mt={2}
        >
            {/* Top bar */}

            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={1}
                flexWrap={"wrap"}
            >
                <VideoUploaderBlog />
                {data.length > 0 ? <DeleteAllVideoBlog /> : ""}
            </Box>
            <StyledDivider />
            <VideoList data={data} error={error} />
        </Box>
    );
}

async function VideoList({
    data,
    error,
}: {
    data: VideoDto[];
    error: unknown;
}) {
    if (error) return <ErrorHandlerElement error={error} />;
    if (data.length == 0) return <EmptyElement />;
    return (
        <Box display="flex" flexDirection="column" flex={1}>
            <Grid
                container
                spacing={1.5}
                columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            >
                {data.map((e) => (
                    <Grid size={1} key={e.id}>
                        <VideoControll video={e} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
