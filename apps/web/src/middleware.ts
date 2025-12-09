import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

console.log('object');

export const config = {
    matcher: ["/((?!_next|.*\\..*).*)"],
};
