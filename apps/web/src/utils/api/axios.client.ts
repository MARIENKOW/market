import axios from "axios";
import { clientEnv } from "@/config/env.client";

const BASE_URL = `${clientEnv.NEXT_PUBLIC_API_ORIGIN_CLIENT}/${clientEnv.NEXT_PUBLIC_API_GLOBAL_PREFIX}`;

export const $apiAxiosClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});
