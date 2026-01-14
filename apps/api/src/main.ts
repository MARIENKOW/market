

import { AppModule } from '@/modules/app/app.module';
import { NestFactory } from '@nestjs/core';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [process.env.CLIENT_API],
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // cookies/auth
    // allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    // exposedHeaders: 'X-Total-Count', // кастомные
    // maxAge: 3600, // preflight кэш
  });
  await app.listen(process.env.SERVER_PORT || 5000);
}






bootstrap();
