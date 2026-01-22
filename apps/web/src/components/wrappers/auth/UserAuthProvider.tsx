import { createContext, useContext, useState } from "react";

const USER_AUTH_DEFAULT = {};

const UserAuthContext = createContext({});

export default function UserAuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [data, setData] = useState({});
    return (
        <UserAuthContext.Provider value={{ ...data }}>
            {children}
        </UserAuthContext.Provider>
    );
}

export const useUserAuth = () => {
    return useContext(UserAuthContext);
};
