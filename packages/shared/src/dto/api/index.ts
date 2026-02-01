import { MessageKeyType } from "../../i18n";

export interface ApiErrorResponse {
    status: number;
    message: string;
    code: string; // BAD_REQUEST, VALIDATION_ERROR
    data: any; // fieldErrors, details
    timestamp: string;
    path: string;
    context: "NEXT" | "API" | "NETWORK";
    errorType: "ApiErrorResponse";
}

export type FieldMap<T = Record<string, unknown>> = {
    [K in keyof T]?: MessageKeyType[];
};

export type FieldsErrors<T extends Record<string, unknown> | never = never> = {
    fields?: FieldMap<T>;
    root?: string[];
};
