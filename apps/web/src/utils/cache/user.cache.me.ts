import { getCookieValue } from "@/actions/cookies.actions";
import {
    isApiErrorResponse,
    isUnauthorizedError,
} from "@/helpers/error/error.type.helper";
import UserService from "@/services/user/user.service";
import { ApiErrorResponse, UserDto } from "@myorg/shared/dto";
import { cache } from "react";
import { $apiUserServer } from "@/utils/api/user/fetch.user.server";

type CachedUserMeReturn = Promise<{
    user: UserDto | null;
    error: boolean;
}>;

export const getUserAuth: () => CachedUserMeReturn = cache(async () => {
    let user = null;
    let error = false;
    const accessToken = await getCookieValue("accessTokenUser");
    if (!accessToken) return { user, error };
    try {
        const userService = new UserService($apiUserServer);
        const res = await userService.me();
        user = res.data;
    } catch (e) {
        console.log(e);
        if (
            !isApiErrorResponse(e) ||
            !isUnauthorizedError(e as ApiErrorResponse)
        )
            error = true;
    }
    return { user, error };
});
