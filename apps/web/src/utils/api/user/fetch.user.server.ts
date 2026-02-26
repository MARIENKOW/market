"use server";

import { getCookieValue } from "@/actions/cookies.actions";
import { getHeaderValue } from "@/actions/headers.actions";
import {
    isApiErrorResponse,
    isUnauthorizedError,
} from "@/helpers/error/error.type.helper";
import { FetchBaseOptions, fetchCustom } from "@/lib/api";
import { $apiServer } from "@/utils/api/fetch.server";
import { ApiErrorResponse } from "@myorg/shared/dto";
import { redirect } from "next/navigation";

export const $apiUserServer = async (
    path: string,
    options: FetchBaseOptions,
) => {
    const accessToken = await getCookieValue("accessToken");
    const defaultOptions: FetchBaseOptions = {
        headers: {
            Aauthorization: `Bearer ${accessToken}`,
        },
    };

    let newHeaders = options.headers || {};

    return await $apiServer(path, {
        ...defaultOptions,
        ...options,
        headers: { ...defaultOptions.headers, ...newHeaders },
    });
};
