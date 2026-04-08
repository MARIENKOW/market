import { BlogDto, PagedResult } from "@myorg/shared/dto";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { FetchCustom, FetchCustomReturn } from "@/utils/api";
import { BlogOutput } from "@myorg/shared/form";
import { toFormData } from "@/utils/toFormData";
import { toSearchParams } from "@/utils/toSearchParams";

const { path } = FULL_PATH_ENDPOINT.blog;

export default class BlogService {
    create: (body: BlogOutput) => FetchCustomReturn<BlogDto>;
    getAll: (params: {
        page: number;
        limit?: number;
    }) => FetchCustomReturn<PagedResult<BlogDto>>;
    delete: (id: string) => FetchCustomReturn<void>;
    deleteAll: () => FetchCustomReturn<void>;
    get: (id: string) => FetchCustomReturn<BlogDto>;

    constructor(api: FetchCustom) {
        this.create = (body) =>
            api<BlogDto>(path, { method: "POST", body: toFormData(body) });

        this.getAll = (params) => {
            const query = toSearchParams(params);
            return api<PagedResult<BlogDto>>(`${path}?${query.toString()}`, {
                method: "GET",
            });
        };

        this.delete = (id) => api<void>(`${path}/${id}`, { method: "DELETE" });

        this.deleteAll = () => api<void>(path, { method: "DELETE" });
        this.get = (id) => api<BlogDto>(path + "/" + id, { method: "GET" });
    }
}
