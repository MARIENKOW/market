import { FetchCustom, FetchCustomReturn } from "@/utils/api";
import { AvailableMode } from "@/theme/theme";
import { UserDto } from "@myorg/shared/dto";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { AvailableLanguage } from "@myorg/shared/i18n";
import {
    UserChangePasswordDtoOutput,
    UserChangePasswordSettingsDtoOutput,
} from "@myorg/shared/form";

const { path, status, confirm, resend, init, initWithoutPassword, cancel } =
    FULL_PATH_ENDPOINT.user.changePassword;

export default class ChangePasswordUserService {
    init: (
        body: UserChangePasswordSettingsDtoOutput,
    ) => FetchCustomReturn<{ email: string; time: number }>;
    initWithoutPassword: (
        body: UserChangePasswordDtoOutput,
    ) => FetchCustomReturn<{ email: string; time: number }>;
    // status: () => FetchCustomReturn<UserDto>;
    // confirm: () => FetchCustomReturn<UserDto>;
    // resend: () => FetchCustomReturn<UserDto>;
    // cancel: () => FetchCustomReturn<UserDto>;
    abortController: AbortController | null = null;
    constructor(api: FetchCustom) {
        this.init = async (body) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<{ email: string; time: number }>(init.path, {
                signal: controller.signal,
                method: "POST",
                body: JSON.stringify(body),
            });
            return res;
        };
        this.initWithoutPassword = async (body) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<{ email: string; time: number }>(init.path, {
                signal: controller.signal,
                method: "POST",
                body: JSON.stringify(body),
            });
            return res;
        };
    }
}
