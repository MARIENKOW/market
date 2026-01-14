import { route } from "@myorg/shared/route";
import NextAuth from "next-auth";
import type { NextAuthConfig, NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
import { $BaseApi } from "@/lib/axios";

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
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) return null;
                console.log($BaseApi);
                try {
                    const { data } = await $BaseApi.post("/login", credentials);
                    console.log(data);
                    return data;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                // проверяем есть ли user с user.email в базе
                // const res = await $BaseApi.post("/auth/google-signin", { email: user.email });
                // return res.data.success;
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.email = token.email as string;
            return session;
        },
    },
    pages: {
        signIn: route.public.signin,
    },
    session: { strategy: "jwt" },
};

export const { handlers, signIn, signOut, auth }: NextAuthResult =
    NextAuth(nextConfig);
