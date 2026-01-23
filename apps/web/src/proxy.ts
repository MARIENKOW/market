import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import {
    PRIVATE_USER_PATH,
    USER_PRIVATE_FALLBACK_ROUTE,
} from "@myorg/shared/route";
import { NextRequest, NextResponse } from "next/server";
import { AvailableLanguage, languages } from "@myorg/shared/i18n";

function isEqualPath(PRIVATE_PATHS: string[], pathname: string) {
    return PRIVATE_PATHS.some(
        (path) => pathname === path || pathname.startsWith(`${path}`),
    );
}

function getPathnameWithoutLocale(pathnameDirty: string): {
    pathname: string;
    locale: AvailableLanguage | null;
} {
    for (const locale of languages) {
        if (
            pathnameDirty === `/${locale}` ||
            pathnameDirty.startsWith(`/${locale}`)
        ) {
            return {
                pathname: pathnameDirty.slice(locale.length + 1),
                locale,
            }; // Убираем /en/
        }
    }
    return { pathname: pathnameDirty, locale: null };
}

export default function Mid(req: NextRequest) {
    const sessionId = req.cookies.get("sessionId")?.value;
    const { pathname, locale } = getPathnameWithoutLocale(req.nextUrl.pathname);

    if (!sessionId && isEqualPath(PRIVATE_USER_PATH, pathname)) {
        const loginUrl = new URL(
            locale
                ? `/${locale}${USER_PRIVATE_FALLBACK_ROUTE}`
                : USER_PRIVATE_FALLBACK_ROUTE,
            req.url,
        );
        loginUrl.searchParams.set("callback", pathname);
        return NextResponse.redirect(loginUrl);
    }
    return createMiddleware(routing)(req);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
