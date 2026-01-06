import NextAuth from "next-auth";
import type { NextAuthConfig, NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";

const nextConfig: NextAuthConfig = {
    secret: process.env.AUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        /* ... */
    },
    session: { strategy: "jwt" },
};

export const { handlers, signIn, signOut, auth }: NextAuthResult =
    NextAuth(nextConfig);
