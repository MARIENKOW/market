"use client";

import { Session } from "next-auth";
import { SessionProvider as SessionProviderAuth } from "next-auth/react";

type Props = {
    children: React.ReactNode;
    session: Session | null;
};

export default function SessionProvider({ children, session }: Props) {
    return (
        <SessionProviderAuth session={session}>{children}</SessionProviderAuth>
    );
}
