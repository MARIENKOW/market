import { en } from "@myorg/shared/i18n/languages/en";
import { ru } from "@myorg/shared/i18n/languages/ru";
import { de } from "@myorg/shared/i18n/languages/de";

export const messagesModules = { en, ru, de } as const;
export const languages = Object.keys(messagesModules) as Array<
    keyof typeof messagesModules
>;
export type AvailableLanguage = (typeof languages)[number];
export const defaultLanguage: AvailableLanguage = "ru";
export const messagesMap: Record<AvailableLanguage, typeof en> =
    messagesModules;
