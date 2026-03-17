import { FetchCustom, FetchCustomReturn } from "@/utils/api";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";

const { check } = FULL_PATH_ENDPOINT.resetPasswordToken.admin;

export default class ResetPasswordTokenServiceAdmin {
    check: ({ token }: { token: string }) => FetchCustomReturn<true>;
    abortController: AbortController | null = null;
    constructor(api: FetchCustom) {
        this.check = async (data) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<true>(check.path, {
                signal: controller.signal,
                cache: "no-store",
                method: "POST",
                body: JSON.stringify(data),
            });
            return res;
        };
    }
}
