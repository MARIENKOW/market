import { MessageKeyType } from "../../i18n";

export interface ApiErrorResponse {
    status: number;
    message: string;
    code: string; // BAD_REQUEST, VALIDATION_ERROR
    data: any; // fieldErrors, details
    timestamp: string;
    path: string;
    context: "NEXT" | "API" | "NETWORK";
}

export type FieldsErrors<T extends Record<string, any>> = {
    [K in keyof T]?: MessageKeyType[];
} & {
    "root.server"?: MessageKeyType[];
};
