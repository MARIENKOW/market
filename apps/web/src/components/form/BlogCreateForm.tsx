"use client";

import BlogForm from "@/components/form/BlogForm";
import { useRouter } from "@/i18n/navigation";
import BlogService from "@/services/blog/blog.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";

const { create } = new BlogService($apiAdminClient);

export default function BlogCreateForm() {
    const router = useRouter();
    return (
        <BlogForm
            onSuccess={async (value) => {
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                await create(value);
                router.push(FULL_PATH_ROUTE.admin.blog.path);
            }}
        />
    );
}
