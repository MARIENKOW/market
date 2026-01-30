import type { AvailableLanguage, MessageKeyType } from "@myorg/shared/i18n";
import type { I18nService as BaseI18nService } from "nestjs-i18n";

declare module "nestjs-i18n" {
    interface I18nService extends BaseI18nService {
        t(
            key: MessageKeyType,
            options?: {
                lang?: AvailableLanguage;
                args?: Record<string, string | number>;
            },
        ): string;
    }
}
