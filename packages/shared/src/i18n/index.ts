import { ua } from "./languages/ua";
import { type MessageStructure } from "./languages/ua";
export { type MessageStructure } from "./languages/ua";

const messagesModules = {
    //первый - defaultLanguage
    ua,
    // en,
} as const;

export type AvailableLanguage = keyof typeof messagesModules;

export const languages = Object.keys(messagesModules) as AvailableLanguage[];

export const defaultLanguage: AvailableLanguage = "ua";

export const messagesMap: Record<AvailableLanguage, MessageStructure> =
    messagesModules;

type RecursiveKeys<T, Prefix extends string = ""> = {
    [K in keyof T]: T[K] extends Record<string, any>
        ? RecursiveKeys<T[K], `${Prefix}${K & string}.`>
        : `${Prefix}${K & string}`;
}[keyof T];

export type MessageKeyType = RecursiveKeys<MessageStructure>;

export const getMessageKey = <T extends MessageKeyType>(key: T) => key;
