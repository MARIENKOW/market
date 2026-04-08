"use client";

import BlogForm from "@/components/form/BlogForm";
import { useRouter } from "@/i18n/navigation";
import BlogService from "@/services/blog/blog.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { useTranslations } from "next-intl";

const { create } = new BlogService($apiAdminClient);

export default function BlogCreateForm() {
    const router = useRouter();
    const t = useTranslations();
    return (
        <BlogForm
            onSuccess={async (value) => {
                await create(value);
                snackbarSuccess(t("pages.admin.blog.feedback.create"));
                router.push(FULL_PATH_ROUTE.admin.blog.path);
            }}
        />
    );
}
