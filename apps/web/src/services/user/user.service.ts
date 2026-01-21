import { FetchCustom } from "@/lib/api";
import { $api } from "@/lib/api/fetch";
import { ENDPOINT, FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import axios, { AxiosInstance } from "axios";

const { me } = FULL_PATH_ENDPOINT.user;

export default class UserService {
    me: () => Promise<any>;
    abortController: AbortController | null = null;
    constructor(api: FetchCustom = $api) {
        this.me = async () => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api(me.path, {
                signal: controller.signal,
            });
            return res;
        };
    }
}
