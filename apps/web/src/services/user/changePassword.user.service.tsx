import { FetchCustom, FetchCustomReturn } from "@/utils/api";
import { ChangePasswordStatus, MailSendSuccess } from "@myorg/shared/dto";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import {
    ChangePasswordCodeDtoOutput,
    ChangePasswordDtoOutput,
    ChangePasswordSettingsDtoOutput,
} from "@myorg/shared/form";

const { status, confirm, resend, init, initWithoutPassword, cancel } =
    FULL_PATH_ENDPOINT.user.changePassword;

export default class ChangePasswordUserService {
    init: (
        body: ChangePasswordSettingsDtoOutput,
    ) => FetchCustomReturn<MailSendSuccess>;
    initWithoutPassword: (
        body: ChangePasswordDtoOutput,
    ) => FetchCustomReturn<MailSendSuccess>;
    cancel: () => FetchCustomReturn<void>;
    resend: () => FetchCustomReturn<MailSendSuccess>;
    confirm: (body: ChangePasswordCodeDtoOutput) => FetchCustomReturn<void>;
    status: () => FetchCustomReturn<ChangePasswordStatus>;
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
            const res = await api<MailSendSuccess>(initWithoutPassword.path, {
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
        this.status = async () => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<ChangePasswordStatus>(status.path, {
                signal: controller.signal,
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
