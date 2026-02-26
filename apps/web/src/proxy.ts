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

const BUFFER_MS = 10_000; // 10 секунд

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 < Date.now() + BUFFER_MS;
    } catch {
        return true;
    }
}

export default function Mid(req: NextRequest) {
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

    const accessTokenUser = req.cookies.get("accessTokenUser")?.value;
    if (accessTokenUser && isTokenExpired(accessTokenUser)) {
        const redirectUrl = new URL(
            `/nextApi/auth/user/refresh?callback=${req.nextUrl.pathname}`,
            req.url,
        );
        return NextResponse.redirect(redirectUrl);
    }

    const res = createMiddleware(routing)(req);
    return res;
}

export const config = {
    matcher: [
        "/((?!api|nextApi|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};
