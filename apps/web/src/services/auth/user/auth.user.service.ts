import { $apiServer } from "@/lib/axios/axios.server";
import { AUTH_API_URL } from "@/services/auth/auth.service";
import { ENDPOINT, FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { UserLoginDtoOutput, UserRegisterDtoOutput } from "@myorg/shared/form";

const { auth } = ENDPOINT;

const AUTH_USER_API_URL = AUTH_API_URL + "/" + auth.user.path;

console.log(AUTH_USER_API_URL + auth.user.register.path);

export default class AuthUserService {
    login: (value: UserLoginDtoOutput) => Promise<any>;
    register: (value: UserRegisterDtoOutput) => Promise<any>;
    abortController: AbortController | null = null;
    constructor($api = $apiServer) {
        this.login = async (value) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await $api.post(
                AUTH_USER_API_URL + "/" + auth.user.login.path,
                value,
                {
                    signal: controller.signal,
                },
            );
            return res;
        };
        this.register = async (value) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await $api.post(
                AUTH_USER_API_URL + "/" + auth.user.register.path,
                value,
                {
                    signal: controller.signal,
                },
            );
            return res;
        };
    }
}
