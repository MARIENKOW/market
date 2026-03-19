"use client";

import { UserDto } from "@myorg/shared/dto";
import { createContext, useContext } from "react";

type UserAuthContext = {
    user: UserDto | null;
    error: boolean;
};

const UserAuthContext = createContext<UserAuthContext>({
    user: null,
    error: false,
});

export default function UserAuthProvider({
    children,
    user,
    error,
}: {
    error: boolean;
    user: UserDto | null;
    children: React.ReactNode;
}) {
    // const t = useTranslations();
    // useEffect(() => {
    //     console.log(error);
    //     if (error) {
    //         snackbarError(t("api.auth"));
    //     }
    // }, [error]);
    return (
        <UserAuthContext.Provider value={{ user, error }}>
            {children}
        </UserAuthContext.Provider>
    );
}

export const useUserAuth = () => {
    return useContext(UserAuthContext);
};
