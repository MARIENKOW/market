"use client";

import { StyledButton } from "@/components/ui/StyledButton";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { useConfirm } from "@/hooks/useConfirm";
import { videoKeys } from "@/lib/tanstack/keys";
import BlogVideoService from "@/services/blog/video/blogVideo.service";
import { $apiUserAxiosClient } from "@/utils/api/user/axios.user.client";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";

const { deleteAll } = new BlogVideoService($apiUserAxiosClient);

export default function DeleteAllVideoBlog() {
    const [loading, setLoading] = useState<boolean>(false);
    const { confirm, confirmDialog } = useConfirm();
    const t = useTranslations();
    const queryClient = useQueryClient();
    const handleDeleteAll = async () => {
        setLoading(true);
        try {
            const isConfirm = await confirm(t("video.control.deleteAllConfirm"));
            if (!isConfirm) return;
            await deleteAll();
            queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
        } catch (error) {
            errorHandler({ error, t });
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {confirmDialog}
            <StyledButton
                variant="outlined"
                color="error"
                loading={loading}
                onClick={handleDeleteAll}
            >
                {t("video.control.deleteAll")}
            </StyledButton>
        </>
    );
}
