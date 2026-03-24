import { FetchCustom, FetchCustomReturn } from "@/utils/api";
import { AdminDto } from "@myorg/shared/dto";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";

const { path } = FULL_PATH_ENDPOINT.auth.admin.session;

export default class SessionServiceAdmin {
    getMe: () => FetchCustomReturn<AdminDto>;
    abortController: AbortController | null = null;
    constructor(api: FetchCustom) {
        this.getMe = async () => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<AdminDto>(path, {
                signal: controller.signal,
            });
            return res;
        };
    }
}
