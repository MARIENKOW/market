import { defineConfig } from 'prisma/config';

import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(process.cwd(), '../../.env') }); // root .env


export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: `${process.env.DB_PROVIDER}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  },
});
