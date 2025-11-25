import { defineRouting } from "next-intl/routing";
import {
    defaultLanguage,
    languages,
} from "../../../../packages/shared/src/i18n";

export const routing = defineRouting({
    locales: languages,
    defaultLocale: defaultLanguage,
    localePrefix: "as-needed",
});
