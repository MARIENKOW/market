import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoginSchema } from "@myorg/shared";

console.log(LoginSchema);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5000);
}
console.log('bjkl;')

bootstrap();
