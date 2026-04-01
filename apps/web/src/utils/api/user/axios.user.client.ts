import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { $apiAxiosClient } from "@/utils/api/axios.client";
import { dispatchCustomEvent, EVENTS_KEYS } from "@/helpers/event.helper";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { $apiClient } from "@/utils/api/fetch.client";
import { FetchCustomReturn } from "@/utils/api";

// ─── Guards ──────────────────────────────────────────────────────
const isAxiosError = (error: unknown): error is AxiosError =>
    axios.isAxiosError(error);

const isUnauthorized = (error: unknown): boolean =>
    isAxiosError(error) && error.response?.status === 401;

// ─── Singleton ───────────────────────────────────────────────────
const authService = new AuthUserService($apiClient);

// ─── Refresh queue — защита от параллельных рефрешей ─────────────
let refreshPromise: FetchCustomReturn<true> | null = null;

const tryRefresh = async (): Promise<void> => {
    if (!refreshPromise) {
        refreshPromise = authService.refresh();
    }
    try {
        await refreshPromise;
    } finally {
        refreshPromise = null;
    }
};

// ─── Instance ────────────────────────────────────────────────────
export const $apiUserAxiosClient = axios.create({
    baseURL: $apiAxiosClient.defaults.baseURL,
    withCredentials: true,
    headers: {
        "x-type": "USER",
    },
});

// ─── Interceptor ─────────────────────────────────────────────────
$apiUserAxiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Не 401 — пробрасываем сразу
        if (!isUnauthorized(error)) {
            throw error;
        }

        const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
            error.config;

        // Защита от бесконечного retry
        if (originalRequest._retry) {
            dispatchCustomEvent(EVENTS_KEYS.UNAUTHORIZED);
            throw error;
        }
        originalRequest._retry = true;

        // 401 — пробуем рефреш
        try {
            await tryRefresh();
        } catch (refreshError) {
            dispatchCustomEvent(EVENTS_KEYS.UNAUTHORIZED);
            throw refreshError;
        }

        // Повторяем запрос с новым токеном
        try {
            return await $apiUserAxiosClient(originalRequest);
        } catch (retryError) {
            if (isUnauthorized(retryError)) {
                dispatchCustomEvent(EVENTS_KEYS.UNAUTHORIZED);
            }
            throw retryError;
        }
    },
);
