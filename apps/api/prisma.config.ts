import { defineConfig } from "prisma/config";
import { config } from "dotenv";
import path = require("path");
import { env } from "./src/config";

config({ path: path.resolve(process.cwd(), "../../.env") }); // root .env

export default defineConfig({
    schema: "prisma/",
    migrations: {
        path: "prisma/migrations",
        seed: "tsx prisma/seed.ts",
    },
    datasource: {
        url: env.DB_URL,
    },
});
