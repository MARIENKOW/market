import { getUserSessionId } from "@/actions/cookies.actions";
import {
    isApiErrorResponse,
    isUnauthorizedError,
} from "@/helpers/error/error.type.helper";
import { $apiServer } from "@/lib/api/fetch.server";
import UserService from "@/services/user/user.service";
import { ApiErrorResponse, UserDto } from "@myorg/shared/dto";
import { cache } from "react";

type CachedUserMeReturn = Promise<{
    user: UserDto | null;
    error: boolean;
}>;

export const getUserAuth: () => CachedUserMeReturn = cache(async () => {
    let user = null;
    let error = false;
    const sessionId = await getUserSessionId();
    if (!sessionId) return { user, error };
    try {
        const userService = new UserService($apiServer);
        user = await userService.me();
    } catch (e) {
        if (
            !isApiErrorResponse(e) ||
            !isUnauthorizedError(e as ApiErrorResponse)
        )
            error = true;
    }
    return { user, error };
});
