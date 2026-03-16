import { serverEnv } from "@/config/env.server";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
serverEnv

const nextConfig: NextConfig = {
    reactCompiler: true,
    allowedDevOrigins: serverEnv.ALLOWED_ORIGIN,
    // compiler: {
    //     removeConsole: {
    //         exclude: ["error", "warn"], // оставить error и warn, удалить log, info и т.д.
    //     },
    // },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
