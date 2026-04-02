"use server";

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getAllCookieToClient } from "@/actions/cookies.actions";
import { clientEnv } from "@/config/env.client";
import { serverEnv } from "@/config/env.server";

const BASE_URL = `${serverEnv.API_ORIGIN_SERVER}/${clientEnv.NEXT_PUBLIC_API_GLOBAL_PREFIX}`;

// Создаем экземпляр
export const $apiAxiosServer: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // важно, если нужна поддержка cookies
    headers: {}, // базовые заголовки, можно добавить defaults
});

// Добавляем request интерцептор для автоматической подстановки cookies
$apiAxiosServer.interceptors.request.use(async (config) => {
    const cookie = await getAllCookieToClient();

    config.headers.set("cookie", cookie);

    return config;
});
