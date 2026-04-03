// hooks/useVideos.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { videoKeys } from "@/lib/tanstack/keys";
import BlogVideoService from "@/services/blog/video/blogVideo.service";
import { $apiUserAxiosClient } from "@/utils/api/user/axios.user.client";

const { getAll } = new BlogVideoService($apiUserAxiosClient);

export function useVideos(filters: { page: number }) {
    return useQuery({
        queryKey: videoKeys.list(filters),
        queryFn: async () => (await getAll(filters)).data,
        placeholderData: (prev) => prev, // убирает мигание при смене фильтров
    });
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
