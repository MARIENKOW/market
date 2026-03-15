import { FetchCustom, FetchCustomReturn } from "@/lib/api";
import { AvailableMode } from "@/theme/theme";
import { UserDto } from "@myorg/shared/dto";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { AvailableLanguage } from "@myorg/shared/i18n";

const { me, theme, locale } = FULL_PATH_ENDPOINT.user;

export default class UserService {
    me: () => FetchCustomReturn<UserDto>;
    changeTheme: ({
        theme,
    }: {
        theme: AvailableMode;
    }) => FetchCustomReturn<true>;
    changeLocale: ({
        locale,
    }: {
        locale: AvailableLanguage;
    }) => FetchCustomReturn<true>;
    abortController: AbortController | null = null;
    constructor(api: FetchCustom) {
        this.me = async () => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<UserDto>(me.path, {
                signal: controller.signal,
                cache: "no-store",
            });
            return res;
        };
        this.changeTheme = async (body) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<true>(theme.path, {
                signal: controller.signal,
                method: "PUT",
                body: JSON.stringify(body),
            });
            return res;
        };
        this.changeLocale = async (body) => {
            if (this.abortController) this.abortController.abort();
            const controller = new AbortController();
            this.abortController = controller;
            const res = await api<true>(locale.path, {
                signal: controller.signal,
                method: "PUT",
                body: JSON.stringify(body),
            });
            return res;
        };
    }
}
