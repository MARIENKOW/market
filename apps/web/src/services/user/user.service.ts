import { FetchCustom } from "@/lib/api";
import { UserDto } from "@myorg/shared/dto";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";

const { me } = FULL_PATH_ENDPOINT.user;

export default class UserService {
    me: () => Promise<UserDto>;
    abortController: AbortController | null = null;
    constructor(api: FetchCustom) {
        this.me = async () => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api(me.path, {
                signal: controller.signal,
                cache: "no-store",
            });
            return res;
        };
    }
}
