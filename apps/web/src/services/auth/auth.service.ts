import { ENDPOINT } from "@myorg/shared/endpoints";

export const AUTH_API_URL =
    process.env.NEXT_PUBLIC_SERVER_API + "/" + ENDPOINT.auth.path;
