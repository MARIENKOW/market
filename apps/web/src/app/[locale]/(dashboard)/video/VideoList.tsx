import { VideoControl } from "@/app/[locale]/(dashboard)/video/VideoControl";
import EmptyElement from "@/components/feedback/EmptyElement";
import ErrorHandlerElement from "@/components/feedback/error/ErrorHandlerElement";
import { Box, Grid } from "@mui/material";
import { VideoDto } from "@myorg/shared/dto";

export function VideoList({
    data,
    error,
}: {
    data?: VideoDto[];
    error: unknown;
}) {
    if (error) return <ErrorHandlerElement error={error} />;
    if (data && data.length == 0) return <EmptyElement />;
    return (
        <Box display="flex" flexDirection="column" flex={1}>
            <Grid
                container
                spacing={1.5}
                columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            >
                {data?.map((e) => (
                    <Grid size={1} key={e.id}>
                        <VideoControl video={e} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
