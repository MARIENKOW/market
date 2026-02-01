// utils/i18n-duration.ts
import { I18nContext } from "nestjs-i18n";
import { AvailableLanguage, defaultLanguage } from "@myorg/shared/i18n";
import humanizeDuration from "humanize-duration";

export function i18nFormatDuration(
    ms: number,
    lang?: AvailableLanguage,
): string {
    const language = lang || I18nContext.current()?.lang || defaultLanguage;

    console.log(language);
console.log(ms);
    return humanizeDuration(ms, {
        language,
        largest: 2,
        round:true,
        fallbacks: ["en"],
    });
}
