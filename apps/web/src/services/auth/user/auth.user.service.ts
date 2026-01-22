import { FetchCustom } from "@/lib/api";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { UserLoginDtoOutput, UserRegisterDtoOutput } from "@myorg/shared/form";

const { login, register, logout } = FULL_PATH_ENDPOINT.auth.user;

export default class AuthUserService {
    login: (body: UserLoginDtoOutput) => Promise<any>;
    register: (body: UserRegisterDtoOutput) => Promise<any>;
    abortController: AbortController | null = null;

    constructor(api: FetchCustom) {
        this.login = async (body) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api(login.path, {
                signal: controller.signal,
                method: "POST",
                body: JSON.stringify(body),
            });
            return res;
        };
        this.register = async (body) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api(register.path, {
                signal: controller.signal,
                method: "POST",
                body: JSON.stringify(body),
            });
            return res;
        };
    }
}
