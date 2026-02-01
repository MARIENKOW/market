import { FetchCustom } from "@/lib/api";
import { UserDto } from "@myorg/shared/dto";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import {
    UserLoginDtoOutput,
    UserRegisterDtoOutput,
    UserForgotPasswordDtoOutput,
    UserChangePasswordDtoOutput,
} from "@myorg/shared/form";

const { login, register, logout, forgotPassword } =
    FULL_PATH_ENDPOINT.auth.user;

export default class AuthUserService {
    login: (body: UserLoginDtoOutput) => Promise<true>;
    logout: () => Promise<true>;
    register: (body: UserRegisterDtoOutput) => Promise<UserDto>;
    forgotPassword: (body: UserForgotPasswordDtoOutput) => Promise<string>;
    changePassword: (
        body: UserChangePasswordDtoOutput,
        { token, email }: { token: string; email: null | string },
    ) => Promise<true>;
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
        this.logout = async () => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api(logout.path, {
                signal: controller.signal,
                method: "POST",
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
        this.forgotPassword = async (body) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api(forgotPassword.path, {
                signal: controller.signal,
                method: "POST",
                body: JSON.stringify(body),
            });
            return res;
        };
        this.changePassword = async (body, { email, token }) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            console.log(body);
            this.abortController = controller;
            const res = await api(
                forgotPassword.path + "/" + token + "?email=" + email,
                {
                    signal: controller.signal,
                    method: "POST",
                    body: JSON.stringify(body),
                },
            );
            return res;
        };
    }
}
