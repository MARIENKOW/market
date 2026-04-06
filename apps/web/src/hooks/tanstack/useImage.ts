// hooks/useImages.ts
import { usePaginatedQuery } from "@/hooks/tanstack/usePaginatedQuery";
import { imageKeys } from "@/lib/tanstack/keys";
import BlogImageService from "@/services/blog/image/blogImage.service";
import { $apiUserAxiosClient } from "@/utils/api/user/axios.user.client";

const { getAll } = new BlogImageService($apiUserAxiosClient);

export function useImages() {
    return usePaginatedQuery(
        (page) => imageKeys.list({ page }),
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
