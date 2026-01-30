import { Injectable } from "@nestjs/common";

import {
    AvailableLanguage,
    defaultLanguage,
    languages,
    MessageKeyType,
    messagesMap,
} from "@myorg/shared/i18n";

@Injectable()
export class I18nService {
    constructor() {}

    t<L extends keyof typeof messagesMap>(
        locale: L,
        key: MessageKeyType,
    ): string {
        return (
            key
                .split(".")
                .reduce<any>((acc, part) => acc?.[part], messagesMap[locale]) ??
            key
        );
    }
    getLocale(locale: string): AvailableLanguage {
        return this.hasLocale(locale) ? locale : defaultLanguage;
    }
    hasLocale(locale: string): locale is AvailableLanguage {
        return languages.includes(locale as AvailableLanguage);
    }
}
