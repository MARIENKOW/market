import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import {
    PRIVATE_USER_PATH,
    USER_PRIVATE_FALLBACK_ROUTE,
} from "@myorg/shared/route";
import { NextRequest, NextResponse } from "next/server";
import {
    getPathnameWithoutLocale,
    isEqualPath,
} from "@/helpers/proxy/proxy.path.helper";
import { getCookieValue } from "@/actions/cookies.actions";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { $apiServer } from "@/utils/api/fetch.server";
import { isTokenExpired } from "@/helpers/jwt-token.helper";

export default async function Mid(req: NextRequest) {
    // const sessionId = req.cookies.get("sessionId")?.value;
    // const { pathname, locale } = getPathnameWithoutLocale(req.nextUrl.pathname);

    // if (!sessionId && isEqualPath(PRIVATE_USER_PATH, pathname)) {
    //     const loginUrl = new URL(
    //         locale
    //             ? `/${locale}${USER_PRIVATE_FALLBACK_ROUTE}`
    //             : USER_PRIVATE_FALLBACK_ROUTE,
    //         req.url,
    //     );
    //     loginUrl.searchParams.set("callback", pathname);
    //     return NextResponse.redirect(loginUrl);
    // }

    const res = createMiddleware(routing)(req);
    const accessTokenUser = req.cookies.get("accessTokenUser")?.value;
    if (accessTokenUser && isTokenExpired(accessTokenUser)) {
        try {
            const userAuth = new AuthUserService($apiServer);
            console.log('proxyRefreshproxyRefreshproxyRefreshproxyRefreshproxyRefresh');
            const refreshResponse = await userAuth.refresh();
            const setCookies = refreshResponse.headers.getSetCookie();
            setCookies?.forEach((cookie) => {
                const [nameValue, ...attrs] = cookie
                    .split(";")
                    .map((s) => s.trim());
                const [name, value] = nameValue.split("=");

                const attrsObj = Object.fromEntries(
                    attrs.map((attr) => {
                        const [k, v] = attr.split("=");
                        return [k.toLowerCase(), v ?? true];
                    }),
                );

                res.cookies.set(name, value, {
                    path: (attrsObj["path"] as string) ?? "/",
                    httpOnly: !!attrsObj["httponly"],
                    secure: !!attrsObj["secure"],
                    sameSite:
                        (attrsObj["samesite"] as "lax" | "strict" | "none") ??
                        "lax",
                    maxAge: attrsObj["max-age"]
                        ? Number(attrsObj["max-age"])
                        : undefined,
                    expires: attrsObj["expires"]
                        ? new Date(attrsObj["expires"])
                        : undefined,
                });
            });
        } catch (error) {
            console.log("err", error);
        }
    }
    return res;
}

export const config = {
    matcher: [
        "/((?!api|nextApi|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};
