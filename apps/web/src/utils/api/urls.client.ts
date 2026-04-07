import { clientEnv } from "@/config/env.client";

console.log(clientEnv.NEXT_PUBLIC_API_ORIGIN_CLIENT);

export const API_CLIENT_BASE_URL = `${clientEnv.NEXT_PUBLIC_API_ORIGIN_CLIENT}/${clientEnv.NEXT_PUBLIC_API_GLOBAL_PREFIX}`;
