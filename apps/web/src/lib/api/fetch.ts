
import { FetchBaseOptions, fetchCustom } from "@/lib/api";

export const $api = async (path: string, options: FetchBaseOptions) => {
    console.log(process.env.NEXT_PUBLIC_SERVER_API + path);
    return fetchCustom(process.env.NEXT_PUBLIC_SERVER_API + path, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });
};
