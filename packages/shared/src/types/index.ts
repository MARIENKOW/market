export interface ApiErrorResponse {
    status: number;
    message: string;
    code?: string; // BAD_REQUEST, VALIDATION_ERROR
    data?: Record<string, any>; // fieldErrors, details
    timestamp: string;
    path: string;
}
