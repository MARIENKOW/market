import { FetchCustom } from "@/lib/api";
import { UserDto } from "@myorg/shared/dto";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";

const { check } = FULL_PATH_ENDPOINT.resetPasswordToken.user;

export default class ResetPasswordTokenService {
    check: ({
        email,
        token,
    }: {
        email?: string;
        token: string;
    }) => Promise<true>;
    abortController: AbortController | null = null;
    constructor(api: FetchCustom) {
        this.check = async (data) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api(check.path, {
                signal: controller.signal,
                cache: "no-store",
                method: "POST",
                body: JSON.stringify(data),
            });
            return res;
        };
    }
}
