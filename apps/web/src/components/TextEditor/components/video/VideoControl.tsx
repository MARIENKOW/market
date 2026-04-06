"use client";

import { StyledButton } from "@/components/ui/StyledButton";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { useConfirm } from "@/hooks/useConfirm";
import { useRouter } from "@/i18n/navigation";
import { videoKeys } from "@/lib/tanstack/keys";
import BlogVideoService from "@/services/blog/video/blogVideo.service";
import { $apiUserAxiosClient } from "@/utils/api/user/axios.user.client";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { Card, CardHeader } from "@mui/material";
import { grey } from "@mui/material/colors";
import { VideoDto } from "@myorg/shared/dto";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useVideoSelect } from "@/components/TextEditor/components/video/VideoSelectContext";

const videoS = new BlogVideoService($apiUserAxiosClient);

export const VideoControl = ({ video }: { video: VideoDto }) => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const { confirm, confirmDialog } = useConfirm();
    const t = useTranslations();
    const queryClient = useQueryClient();
    const { onSelect } = useVideoSelect();

    const handleAdd = () => {
        onSelect?.(video);
    };

    const handleDelete = async () => {
        try {
            const isConfirm = await confirm(t("video.control.deleteConfirm"));
            if (!isConfirm) return;
            setLoadingDelete(true);
            await videoS.delete(video.id);
            queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
            snackbarSuccess(t("video.control.deleteSuccess"));
        } catch (error) {
            errorHandler({ error, t });
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <Card>
            {confirmDialog}
            <CardHeader
                sx={{
                    bgcolor: grey[900],
                    pl: "6px !important",
                    pr: "6px !important",
                    pt: "3px !important",
                    pb: "3px !important",
                    "& .MuiCardHeader-action": {
                        marginTop: "0px !important",
                        marginRight: "0px !important",
                        marginLeft: "0px !important",
                        marginBottom: "0px !important",
                    },
                }}
                avatar={
                    <StyledButton onClick={handleAdd} size="small">
                        {t("video.control.add")}
                    </StyledButton>
                }
                action={
                    <StyledButton
                        loading={loadingDelete}
                        size="small"
                        color="error"
                        onClick={handleDelete}
                    >
                        {t("video.control.delete")}
                    </StyledButton>
                }
            />
            <video
                style={{
                    aspectRatio: 5 / 3,
                    background: "#000",
                }}
                src={video.url}
                data-id={video.id}
                poster={video.image?.url}
                controls
                preload="none"
                width={"100%"}
            />
        </Card>
    );
};
