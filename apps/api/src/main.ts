import { GlobalExceptionFilter } from "@/common/filters/global.exception.filter";
import { AppModule } from "@/modules/app/app.module";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";


const origin = process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(",")
    : [];
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(process.env.NEXT_PUBLIC_GLOBAL_PREFIX || "");
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.use(cookieParser());
    app.enableCors({
        origin,
        // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true, // cookies/auth
        // allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
        // exposedHeaders: 'X-Total-Count', // кастомные
        // maxAge: 3600, // preflight кэш
    });
    await app
        .listen(process.env.NEXT_PUBLIC_SERVER_PORT || 8000)
        .catch((err) => console.log("nest error: ", err))
        .then((data) => {
            console.log("server is working on port: ", data.address().port);
        });
}

bootstrap();
