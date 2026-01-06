import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
// import { loadConfig } from "@myorg/shared";

// export const config = loadConfig();

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
