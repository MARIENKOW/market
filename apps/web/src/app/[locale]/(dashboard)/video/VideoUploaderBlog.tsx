"use client";

import { VideoUploader } from "@/app/[locale]/(dashboard)/video/VideoUploader";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { useRouter } from "@/i18n/navigation";
import BlogVideoService from "@/services/blog/video/blogVideo.service";
import { $apiUserAxiosClient } from "@/utils/api/user/axios.user.client";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { useTranslations } from "next-intl";

const { upload } = new BlogVideoService($apiUserAxiosClient);

export default function VideoUploaderBlog() {
    const t = useTranslations();
    const router = useRouter();
    return (
        <VideoUploader
            onError={(error, item) => {
                console.log(error);
                errorHandler({ error, t });
            }}
            onSuccess={(result, item) => {
                snackbarSuccess(`${item.file.name} загружено`);
                router.refresh();
            }}
            uploadFn={async (file, { signal, onProgress }) => {
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
