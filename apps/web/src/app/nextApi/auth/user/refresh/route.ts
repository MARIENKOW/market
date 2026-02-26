// app/api/auth/refresh/route.ts
import AuthUserService from "@/services/auth/user/auth.user.service";
import { $apiServer } from "@/utils/api/fetch.server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const callback = searchParams.get("callback") || "/";
    const res = NextResponse.redirect(new URL(callback, req.url));
    const userAuth = new AuthUserService($apiServer);

    let data;
    try {
        data = await userAuth.refresh();
    } catch (error) {
        data = { accessTokenUser: "", refreshTokenUser: "" };
    }
    const { accessTokenUser, refreshTokenUser } = data;
    res.cookies.set("accessTokenUser", accessTokenUser, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    });
    res.cookies.set("refreshTokenUser", refreshTokenUser, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    });
    res.cookies.set("isRefreshed", "true", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    });

    return res;
}

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const callback = searchParams.get("callback") || "/";
    const res = NextResponse.redirect(new URL(callback, req.url));
    const userAuth = new AuthUserService($apiServer);

    let data;
    try {
        data = await userAuth.refresh();
    } catch (error) {
        data = { accessTokenUser: "", refreshTokenUser: "" };
    }
    const { accessTokenUser, refreshTokenUser } = data;
    res.cookies.set("accessTokenUser", accessTokenUser, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    });
    res.cookies.set("refreshTokenUser", refreshTokenUser, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    });
    res.cookies.set("isRefreshed", "true", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    });

    return res;
}
