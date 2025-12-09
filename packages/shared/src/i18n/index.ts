import { ua, type MessageStructure } from "./languages/ua";
import { en } from "./languages/en";
import { de } from "./languages/de";

const messagesModules = {
    en,
    ua,
    de,
} as const;

export type AvailableLanguage = keyof typeof messagesModules;

export const languages = Object.keys(messagesModules) as AvailableLanguage[];

export const messagesMap: Record<AvailableLanguage, MessageStructure> =
    messagesModules;

export const defaultLanguage: AvailableLanguage = "ua";
