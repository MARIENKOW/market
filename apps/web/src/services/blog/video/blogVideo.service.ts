import { FetchCustom, FetchCustomReturn } from "@/utils/api";
import { AvailableMode } from "@/theme/theme";
import { ImageDto, UserDto, VideoDto } from "@myorg/shared/dto";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { AvailableLanguage } from "@myorg/shared/i18n";
import { AvatarUserInput } from "@myorg/shared/form";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const { path } = FULL_PATH_ENDPOINT.blog.video;

export default class BlogVideoService {
    upload: (
        { video }: { video: File },
        options: AxiosRequestConfig,
    ) => Promise<AxiosResponse<VideoDto>>;
    delete: (id: string) => Promise<AxiosResponse<void>>;
    getAll: ({ page }: { page: number }) => Promise<AxiosResponse<VideoDto[]>>;
    deleteAll: () => Promise<AxiosResponse<void>>;
    constructor(api: AxiosInstance) {
        this.upload = async (body, options) => {
            const res = await api.post<VideoDto>(path, body, options);
            return res;
        };
        this.delete = async (id) => {
            return await api.delete<void>(path + "/" + id);
        };
        this.getAll = async (body) => {
            const search = new URLSearchParams();

            for (const [key, value] of Object.entries(body)) {
                if (value !== undefined && value !== null) {
                    search.append(key, String(value));
                }
            }

            const query = search.toString();
            const newPath = query ? `${path}?${query}` : path;
            const res = await api.get<VideoDto[]>(newPath);
            return res;
        };
        this.deleteAll = async () => {
            return await api.delete<void>(path);
        };
    }
}
