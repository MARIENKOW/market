import { en } from "./languages/en";
import { ua } from "./languages/ua";
import { de } from "./languages/de";

export const messagesModules = { en, ua, de } as const;
export const languages = Object.keys(messagesModules) as Array<
    keyof typeof messagesModules
>;
export type AvailableLanguage = (typeof languages)[number];
export const defaultLanguage: AvailableLanguage = "ua";
export const messagesMap: Record<AvailableLanguage, typeof en> =
    messagesModules;
