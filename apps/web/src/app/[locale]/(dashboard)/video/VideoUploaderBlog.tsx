"use client";

import { VideoUploader } from "@/components/features/Uploader/VideoUploader";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { videoKeys } from "@/lib/tanstack/keys";
import BlogVideoService from "@/services/blog/video/blogVideo.service";
import { $apiUserAxiosClient } from "@/utils/api/user/axios.user.client";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const { upload } = new BlogVideoService($apiUserAxiosClient);

export default function VideoUploaderBlog() {
    const t = useTranslations();
    const queryClient = useQueryClient();
    return (
        <VideoUploader
            onError={(error, item) => {
                console.log(error);
                errorHandler({ error, t });
            }}
            onSuccess={(result, item) => {
                snackbarSuccess(
                    t("video.uploader.uploadSuccess", { name: item.file.name }),
                );
                queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
            }}
            uploadFn={async (file, { signal, onProgress }) => {
                // await refresh();
                const { data } = await upload(
                    { video: file },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        signal,
                        onUploadProgress: (e) => {
                            onProgress({
                                loaded: e.loaded,
                                total: e.total ?? 0,
                            });
                        },
                    },
                );

                return data;
            }}
        />
    );
}
