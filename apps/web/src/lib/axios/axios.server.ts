import { getCookieValue } from "@/actions/cookies.actions";
import { auth } from "@/app/api/auth/auth";
import axios from "axios";

export const $apiServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_API,
    withCredentials: true,
});

$apiServer.interceptors.request.use(async (config) => {
    const token = await getCookieValue("sessionToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
