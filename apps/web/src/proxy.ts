import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { auth } from "@/app/api/auth/auth";
import { AUTH_PRIVATE_ROUTE, route } from "@myorg/shared/route";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { AvailableLanguage, languages } from "@myorg/shared/i18n";

const intlMiddleware = createMiddleware(routing);

function isPrivatePath(PRIVATE_PATHS: string[], pathname: string) {
    return PRIVATE_PATHS.some(
        (path) => pathname === path || pathname.startsWith(`${path}`)
    );
}

function getPathnameWithoutLocale(pathname: string): {
    pathname: string;
    locale: AvailableLanguage | null;
} {
    for (const locale of languages) {
        if (pathname === `/${locale}` || pathname.startsWith(`/${locale}`)) {
            return { pathname: pathname.slice(locale.length + 1), locale }; // Убираем /en/
        }
    }
    return { pathname, locale: null }; // Без изменений
}

console.log(process.env.NEXT_PUBLIC_SERVER_API);


export default auth((req) => {
    const isAuth = !!req.auth;
    const { pathname, locale } = getPathnameWithoutLocale(req.nextUrl.pathname);

    console.log();
    if (isAuth) {
        if (isPrivatePath(AUTH_PRIVATE_ROUTE, pathname))
            return NextResponse.redirect(
                new URL(
                    locale
                        ? `/${locale}${route.public.main}`
                        : route.public.main,
                    req.url
                )
            );
    }
    return intlMiddleware(req as any);
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
