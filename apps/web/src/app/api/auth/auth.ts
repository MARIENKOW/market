import NextAuth from "next-auth";
import type { NextAuthConfig, NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";
import { GOOGLE } from "@myorg/shared/config";

const nextConfig: NextAuthConfig = {
    providers: [
        Google({
            clientId: GOOGLE.clientId,
            clientSecret: GOOGLE.clientSecret,
        }),
    ],
    callbacks: {
        /* ... */
    },
    session: { strategy: "jwt" },
};

export const { handlers, signIn, signOut, auth }: NextAuthResult =
    NextAuth(nextConfig);
