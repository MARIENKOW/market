import { ua, type MessageStructure } from "./languages/ua";
import { en } from "./languages/en";
import { de } from "./languages/de";

const messagesModules = {
    //первый - defaultLanguage
    ua,
    en,
    de,
} as const;

export type AvailableLanguage = keyof typeof messagesModules;

export const languages = Object.keys(messagesModules) as AvailableLanguage[];

export const defaultLanguage: AvailableLanguage = "ua";

export const messagesMap: Record<AvailableLanguage, MessageStructure> =
    messagesModules;
