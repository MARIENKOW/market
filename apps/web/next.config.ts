import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    reactCompiler: true,
    transpilePackages: ["@myorg/shared"],
    // compiler: {
    //     removeConsole: {
    //         exclude: ["error", "warn"], // оставить error и warn, удалить log, info и т.д.
    //     },
    // },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
