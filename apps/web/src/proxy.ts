import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import {
    ADMIN_PATH,
    PRIVATE_USER_PATH,
    SUPERADMIN_PATH,
    USER_PRIVATE_FALLBACK_ROUTE,
} from "@myorg/shared/route";
import { NextRequest, NextResponse } from "next/server";
import {
    getPathnameWithoutLocale,
    isEqualPath,
} from "@/helpers/proxy/proxy.path.helper";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { $apiServer } from "@/utils/api/fetch.server";
import { isTokenExpired } from "@/helpers/jwt-token.helper";
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default async function Mid(req: NextRequest) {
    const { pathname, locale } = getPathnameWithoutLocale(req.nextUrl.pathname);

    const res = createMiddleware(routing)(req);
    res.headers.set("x-pathname", pathname);
    if (isEqualPath([...ADMIN_PATH, ...SUPERADMIN_PATH], pathname)) {
    } else {
        const accessTokenUser = req.cookies.get("accessTokenUser")?.value;
        if (accessTokenUser) {
            if (isTokenExpired(accessTokenUser)) {
                try {
                    const userAuth = new AuthUserService($apiServer);
                    const refreshResponse = await userAuth.refresh();
                    const setCookies = refreshResponse.headers.getSetCookie();
                    setCookies?.forEach((cookie) => {
                        const cookieRes = parseSetCookie(cookie);
                        if (!cookieRes) return;
                        res.cookies.set(
                            cookieRes.name,
                            cookieRes.value,
                            cookieRes,
                        );
                    });
                } catch (error) {
                    console.log("err", error);
                    if (isEqualPath(PRIVATE_USER_PATH, pathname)) {
                        const loginUrl = new URL(
                            locale
                                ? `/${locale}${USER_PRIVATE_FALLBACK_ROUTE}`
                                : USER_PRIVATE_FALLBACK_ROUTE,
                            req.url,
                        );
                        loginUrl.searchParams.set("callback", pathname);
                        return NextResponse.redirect(loginUrl);
                    }
                }
            }
        } else {
            if (isEqualPath(PRIVATE_USER_PATH, pathname)) {
                const loginUrl = new URL(
                    locale
                        ? `/${locale}${USER_PRIVATE_FALLBACK_ROUTE}`
                        : USER_PRIVATE_FALLBACK_ROUTE,
                    req.url,
                );
                loginUrl.searchParams.set("callback", pathname);
                return NextResponse.redirect(loginUrl);
            }
        }
    }
    return res;
}

export const config = {
    matcher: [
        "/((?!api|nextApi|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};
