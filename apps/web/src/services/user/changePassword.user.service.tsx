import { FetchCustom, FetchCustomReturn } from "@/utils/api";
import { AvailableMode } from "@/theme/theme";
import { UserDto } from "@myorg/shared/dto";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { AvailableLanguage } from "@myorg/shared/i18n";
import {
    UserChangePasswordCodeDtoOutput,
    UserChangePasswordDtoOutput,
    UserChangePasswordSettingsDtoOutput,
} from "@myorg/shared/form";

const { path, status, confirm, resend, init, initWithoutPassword, cancel } =
    FULL_PATH_ENDPOINT.user.changePassword;

export type MailSendSuccess = {
    email: string;
    time: number;
    cooldown: number | false;
};

export default class ChangePasswordUserService {
    init: (
        body: UserChangePasswordSettingsDtoOutput,
    ) => FetchCustomReturn<MailSendSuccess>;
    initWithoutPassword: (
        body: UserChangePasswordDtoOutput,
    ) => FetchCustomReturn<MailSendSuccess>;
    cancel: () => FetchCustomReturn<void>;
    resend: () => FetchCustomReturn<MailSendSuccess>;
    confirm: (body: UserChangePasswordCodeDtoOutput) => FetchCustomReturn<void>;
    // status: () => FetchCustomReturn<void>;
    abortController: AbortController | null = null;
    constructor(api: FetchCustom) {
        this.init = async (body) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<MailSendSuccess>(init.path, {
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
            const res = await api<MailSendSuccess>(init.path, {
                signal: controller.signal,
                method: "POST",
                body: JSON.stringify(body),
            });
            return res;
        };
        this.confirm = async (body) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<void>(confirm.path, {
                signal: controller.signal,
                method: "POST",
                body: JSON.stringify(body),
            });
            return res;
        };
        this.resend = async () => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<MailSendSuccess>(resend.path, {
                signal: controller.signal,
                method: "POST",
            });
            return res;
        };
        this.cancel = async () => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<void>(cancel.path, {
                signal: controller.signal,
                method: "DELETE",
            });
            return res;
        };
    }
}
