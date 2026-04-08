// hooks/useVideos.ts
import { usePaginatedQuery } from "@/hooks/tanstack/usePaginatedQuery";
import { blogKeys } from "@/lib/tanstack/keys";
import BlogService from "@/services/blog/blog.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";

const { getAll } = new BlogService($apiAdminClient);

export function useBlogs() {
    return usePaginatedQuery(
        (page) => blogKeys.list({ page }),
        (page) => getAll({ page }).then((r) => r.data),
    );
}
