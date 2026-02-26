import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const allowedDevOrigins = process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(",")
    : [];

const nextConfig: NextConfig = {
    reactCompiler: true,
    // transpilePackages: ["@myorg/shared"],
    allowedDevOrigins,
    async rewrites() {
        return [
            {
                source: "/" + process.env.NEXT_PUBLIC_GLOBAL_PREFIX + "/:path*",
                destination:
                    "http://localhost:" +
                    process.env.NEXT_PUBLIC_SERVER_PORT +
                    "/" +
                    process.env.NEXT_PUBLIC_GLOBAL_PREFIX +
                    "/:path*",
            },
        ];
    },
    // compiler: {
    //     removeConsole: {
    //         exclude: ["error", "warn"], // оставить error и warn, удалить log, info и т.д.
    //     },
    // },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
