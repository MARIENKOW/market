import { $apiUserServer } from "@/lib/api/fetch.user.server";
import UserService from "@/services/user/user.service";
import { UserDto } from "@myorg/shared/dto";
import { cache } from "react";

type CachedUserMeReturn = Promise<{
    user: UserDto | null;
    error: unknown | null;
}>;

export const getUserAuth: () => CachedUserMeReturn = cache(async () => {
    let user = null;
    let error = null;
    try {
        const userService = new UserService($apiUserServer);
        user = await userService.me();
    } catch (e) {
        error = e;
    }
    return { user, error };
});
