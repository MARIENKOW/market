"use client";

import { AdminDto } from "@myorg/shared/dto";
import { createContext, useContext } from "react";

type AdminAuthContext = {
    admin: AdminDto | null;
    error: boolean;
};

const AdminAuthContext = createContext<AdminAuthContext>({
    admin: null,
    error: false,
});

export default function AdminAuthProvider({
    children,
    admin,
    error,
}: {
    error: boolean;
    admin: AdminDto | null;
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
        <AdminAuthContext.Provider value={{ admin, error }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export const useAdminAuth = () => {
    return useContext(AdminAuthContext);
};
