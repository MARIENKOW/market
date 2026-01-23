"use client";

import { UserDto } from "@myorg/shared/dto";
import { useTranslations } from "next-intl";
import { createContext, useContext, useEffect, useState } from "react";
import { ApiErrorResponse } from "@myorg/shared/dto";
import { HTTP_STATUSES } from "@myorg/shared/http";
import { snackbarError } from "@/helpers/snackbar/snackbar.error";

type UserAuthContext = {
    user: UserDto | null;
    error: unknown | null;
};

const UserAuthContext = createContext<UserAuthContext>({
    user: null,
    error: null,
});

export default function UserAuthProvider({
    children,
    user,
    error,
}: {
    error: unknown | null;
    user: UserDto | null;
    children: React.ReactNode;
}) {
    const t = useTranslations();
    useEffect(() => {
        function isUnuthorized() {
            if (
                error &&
                typeof error === "object" &&
                "errorType" in error &&
                error.errorType === "ApiErrorResponse"
            ) {
                if (
                    (error as ApiErrorResponse).status ===
                    HTTP_STATUSES.Unauthorized.status
                )
                    return true;
            }
        }
        if (error && !isUnuthorized()) {
            snackbarError(t("api.auth"));
        }
    }, [error]);
    return (
        <UserAuthContext.Provider value={{ user, error }}>
            {children}
        </UserAuthContext.Provider>
    );
}

export const useUserAuth = () => {
    return useContext(UserAuthContext);
};
