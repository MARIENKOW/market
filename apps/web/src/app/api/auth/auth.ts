import { route } from "@myorg/shared/route";
import NextAuth from "next-auth";
import type { NextAuthConfig, NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
import { UserSignUpSchema } from "@myorg/shared/form";
import { email } from "zod";

declare module "next-auth" {
    interface NextAuthRequest extends NextRequest {}
}

export const nextConfig: NextAuthConfig = {
    secret: process.env.AUTH_SECRET,

    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: { label: "email", required: true, type: "email" },
                password: {
                    label: "password",
                    required: true,
                    type: "password",
                },
            },
            async authorize(credentials, request) {
                if (!credentials.email || !credentials.password) return null;
                return { email: "csdc@dasd.da" };
            },
        }),
    ],
    pages: {
        signIn: route.public.signin,
    },
    session: { strategy: "jwt" },
};

export const { handlers, signIn, signOut, auth }: NextAuthResult =
    NextAuth(nextConfig);
