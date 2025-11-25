import { getRequestConfig } from "next-intl/server";
import {
    AvailableLanguage,
    defaultLanguage,
    languages,
    messagesMap,
} from "@myorg/shared/i18n";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
    const store = await cookies();
    const cookieValue = store.get("locale")?.value || defaultLanguage;
    const locale: AvailableLanguage =
        cookieValue && languages.includes(cookieValue as AvailableLanguage)
            ? (cookieValue as AvailableLanguage)
            : defaultLanguage;

    return {
        locale,
        messages: messagesMap[locale],
    };
});
