// hooks/useVideos.ts
import { usePaginatedQuery } from "@/hooks/tanstack/usePaginatedQuery";
import { videoKeys } from "@/lib/tanstack/keys";
import BlogVideoService from "@/services/blog/video/blogVideo.service";
import { $apiAdminAxiosClient } from "@/utils/api/admin/axios.admin.client";

const { getAll } = new BlogVideoService($apiAdminAxiosClient);

export function useVideos() {
    return usePaginatedQuery(
        (page) => videoKeys.list({ page }),
        (page) => getAll({ page }).then((r) => r.data),
    );
}

// export function useVideo(id: string) {
//     return useQuery({
//         queryKey: videoKeys.detail(id),
//         queryFn: () => fetchVideo(id),
//         enabled: Boolean(id),
//     });
// }

// export function useUpdateVideo() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: updateVideo,
//         onSuccess: (updatedVideo) => {
//             // Обновляем кеш точечно — не инвалидируем всё
//             queryClient.setQueryData(
//                 videoKeys.detail(updatedVideo.id),
//                 updatedVideo,
//             );
//             // Инвалидируем список — пусть перезапросит
//             queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
//         },
//     });
// }
