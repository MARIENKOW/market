"use client";

import { useEffect, useRef, useState } from "react";

import { Box, Stack, Divider, Grid } from "@mui/material";
import BlogVideoService from "@/services/blog/video/blogVideo.service";
import { $apiUserAxiosClient } from "@/utils/api/user/axios.user.client";
import { VideoDto } from "@myorg/shared/dto";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { useTranslations } from "next-intl";
import { VideoControll } from "@/app/[locale]/(dashboard)/video/VideoControll";
import {
    UploadDrawer,
    UploadFn,
    UploadTriggerButton,
    useVideoUpload,
} from "@/app/[locale]/(dashboard)/video/upload1/upload-ts";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { snackbarError } from "@/utils/snackbar/snackbar.error";

const { upload } = new BlogVideoService($apiUserAxiosClient);

const uploadVideoFn: UploadFn<VideoDto> = async (
    file,
    { signal, onProgress },
) => {
    const { data } = await upload(
        { video: file },
        {
            headers: { "Content-Type": "multipart/form-data" },
            signal,
            onUploadProgress: (e) => {
                onProgress({ loaded: e.loaded, total: e.total ?? 0 });
            },
        },
    );

    return data;
};

const { getAll } = new BlogVideoService($apiUserAxiosClient);
export default function Page() {
    const [data, setData] = useState<VideoDto[]>([]);
    const t = useTranslations();

    useEffect(() => {
        async function getVideos() {
            try {
                const { data } = await getAll({ page: 1 });
                console.log(data);
                setData(data);
            } catch (error) {
                errorHandler({ error, t });
            }
        }
        getVideos();
    }, []);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const {
        uploads,
        processFiles,
        removeUpload,
        clearFinished,
        cancelUpload,
        cancelAll,
    } = useVideoUpload<VideoDto>({
        uploadFn: uploadVideoFn,

        // onSuccess — что делать после успешной загрузки
        onSuccess: (result, item) => {
            snackbarSuccess(`${item.file.name} загружено`);
            // queryClient.invalidateQueries({ queryKey: ["videos"] });
            // result — это VideoDto, можно добавить в стейт формы и т.д.
            console.log("uploaded:", result.id);
        },

        onError: (_err, item) => {
            snackbarError(`Ошибка: ${item.file.name}`);
        },
    });

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                flex={1}
                height="100%"
                gap={2}
            >
                {/* Top bar */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexShrink={0}
                >
                    <Stack direction="row" gap={1} alignItems="center">
                        <UploadTriggerButton
                            uploads={uploads}
                            onClick={() => setDrawerOpen(true)}
                        />
                    </Stack>
                </Stack>

                <Divider flexItem />

                {data.length > 0 && (
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
                )}
            </Box>

            <UploadDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                uploads={uploads}
                onFiles={processFiles}
                onRemove={removeUpload}
                onCancel={cancelUpload}
                onCancelAll={cancelAll}
                onClearFinished={clearFinished}
            />
        </>
    );
}
