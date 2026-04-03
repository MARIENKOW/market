import BlogVideoService from "@/services/blog/video/blogVideo.service";
import { $apiUserAxiosServer } from "@/utils/api/user/axios.user.server";
import { getQueryClient } from "@/lib/tanstack/queryClient";
import VideoComponentBlog from "@/app/[locale]/(dashboard)/video/VideoComponentBlog";
import { videoKeys } from "@/lib/tanstack/keys";
import { Hydrate } from "@/lib/tanstack/Hydrate";

const { getAll } = new BlogVideoService($apiUserAxiosServer);
export default async function Page() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: videoKeys.list({ page: 1 }),
        queryFn: async () => (await getAll({ page: 1 })).data,
    });

    return (
        <Hydrate>
            <VideoComponentBlog />
        </Hydrate>
    );
}
