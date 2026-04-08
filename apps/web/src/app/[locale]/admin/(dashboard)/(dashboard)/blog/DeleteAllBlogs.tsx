import { StyledButton } from "@/components/ui/StyledButton";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { useConfirm } from "@/hooks/useConfirm";
import { blogKeys } from "@/lib/tanstack/keys";
import BlogService from "@/services/blog/blog.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";

const { deleteAll } = new BlogService($apiAdminClient);

export default function DeleteAllBlogs() {
    const t = useTranslations();
    const [loading, setLoading] = useState<boolean>(false);
    const { confirm, confirmDialog } = useConfirm();
    const queryClient = useQueryClient();
    const handleDelete = async () => {
        setLoading(true);
        try {
            const isConfirm = await confirm();
            if (!isConfirm) return;
            await deleteAll();
            queryClient.invalidateQueries({ queryKey: blogKeys.all });
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
                color="error"
                onClick={handleDelete}
                loading={loading}
            >
                {t("common.deleteAll")}
            </StyledButton>
        </>
    );
}
