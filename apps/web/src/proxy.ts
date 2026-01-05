import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { auth } from "@/app/api/auth/auth";
import { NextRequest, NextResponse } from "next/server";

// export default createMiddleware(routing);

// export default auth(()=>{

// })

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
    // console.log(req);
    // if (pathname.startsWith("/api/auth")) {
    //     const locale =
    //         req.headers.get("accept-language")?.split(",")[0] || "en";
    //     const newPath = pathname.replace("/api/auth", `/${locale}/api/auth`);
    //     return NextResponse.redirect(new URL(newPath, req.url));
    // }
    return intlMiddleware(req as any);
});

export const config = {
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
