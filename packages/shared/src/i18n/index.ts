// import { en } from "./languages/en";
import { uk, type MessageStructure } from "./languages/uk";
export { type MessageStructure } from "./languages/uk";
export const messagesModules = {
    // en,
    uk,
} as const;

export type AvailableLanguage = keyof typeof messagesModules;

export const languages = Object.keys(messagesModules) as AvailableLanguage[];

export const defaultLanguage: AvailableLanguage = "uk";

export const messagesMap: Record<AvailableLanguage, MessageStructure> =
    messagesModules;

type RecursiveKeys<T, Prefix extends string = ""> = {
    [K in keyof T]: T[K] extends Record<string, any>
        ? RecursiveKeys<T[K], `${Prefix}${K & string}.`>
        : `${Prefix}${K & string}`;
}[keyof T];

export type MessageKeyType = RecursiveKeys<MessageStructure>;

export const getMessageKey = <T extends MessageKeyType>(key: T) => key;
