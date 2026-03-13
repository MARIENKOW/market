import { FetchCustom, FetchCustomReturn } from "@/lib/api";
import { UserDto } from "@myorg/shared/dto";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import {
    UserLoginDtoOutput,
    UserRegisterDtoOutput,
    UserForgotPasswordDtoOutput,
    UserChangePasswordDtoOutput,
} from "@myorg/shared/form";

const { login, register, logout, forgotPassword, activate, refresh } =
    FULL_PATH_ENDPOINT.auth.user;

export default class AuthUserService {
    login: (body: UserLoginDtoOutput) => FetchCustomReturn<true>;
    logout: () => FetchCustomReturn<true>;
    refresh: () => FetchCustomReturn<true>;
    register: (body: UserRegisterDtoOutput) => FetchCustomReturn<string>;
    forgotPassword: (
        body: UserForgotPasswordDtoOutput,
    ) => FetchCustomReturn<string>;
    changePassword: (
        body: UserChangePasswordDtoOutput,
        { token, email }: { token: string; email: string | null },
    ) => FetchCustomReturn<true>;
    activate: ({
        email,
        token,
    }: {
        email: string;
        token: string;
    }) => FetchCustomReturn<true>;
    sendActivate: ({ email }: { email?: string }) => FetchCustomReturn<string>;
    abortController: AbortController | null = null;

    constructor(api: FetchCustom) {
        this.login = async (body) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<true>(login.path, {
                signal: controller.signal,
                method: "POST",
                body: JSON.stringify(body),
            });
            return res;
        };
        this.refresh = async () => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<true>(refresh.path, {
                signal: controller.signal,
                credentials: "include",
                method: "GET",
            });
            return res;
        };
        this.activate = async (data) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<true>(activate.path, {
                signal: controller.signal,
                cache: "no-store",
                method: "POST",
                body: JSON.stringify(data),
            });
            return res;
        };
        this.sendActivate = async (data) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<string>(activate.send.path, {
                signal: controller.signal,
                cache: "no-store",
                method: "POST",
                body: JSON.stringify(data),
            });
            return res;
        };
        this.logout = async () => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<true>(logout.path, {
                signal: controller.signal,
                method: "POST",
            });
            return res;
        };
        this.register = async (body) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<string>(register.path, {
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
            const res = await api<string>(forgotPassword.path, {
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
            const res = await api<true>(
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
