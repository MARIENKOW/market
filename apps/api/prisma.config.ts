import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';
import path = require('path');

config({ path: path.resolve(process.cwd(), '../../.env') }); // root .env

export default defineConfig({
  schema: 'prisma/',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: `${process.env.DB_PROVIDER}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  },
});
