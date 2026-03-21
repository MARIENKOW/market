import { AvailableLanguage } from "@myorg/shared/i18n";
import humanizeDuration from "humanize-duration";

export function formatDuration(ms: number, locale: AvailableLanguage): string {
    return humanizeDuration(ms, {
        language: locale,
        largest: 2,
        round: true,
        fallbacks: ["en"],
    });
}
