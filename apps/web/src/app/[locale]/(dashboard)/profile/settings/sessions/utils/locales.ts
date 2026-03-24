import { AvailableLanguage } from "@myorg/shared/i18n";
import type { Locale } from "date-fns";
import { enUS, ru } from "date-fns/locale";

export const DATE_FNS_LOCALES: Record<AvailableLanguage, Locale> = {
    ru,
    en: enUS,
};

export const DEFAULT_LOCALE = enUS;
