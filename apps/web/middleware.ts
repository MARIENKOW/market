import createMiddleware from "next-intl/middleware";
import { languages, defaultLanguage } from "@myorg/shared/i18n";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const defineConfig = {
    matcher: ["/", "/(ru|en)/:path*"],
};
