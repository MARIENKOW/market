import { AppController } from "@/modules/app/app.controller";
import { AppService } from "@/modules/app/app.service";
import { AuthModule, AuthRegisterModule } from "@/modules/auth/auth.module";
import {
    I18nModule,
    AcceptLanguageResolver,
    CookieResolver,
} from "nestjs-i18n";
import { CoreModule } from "@/modules/core/core.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { defaultLanguage } from "@myorg/shared/i18n";
import { TsI18nLoader } from "@/lib/i18n/i18n.loader";
import { RequestContextMiddleware } from "@/common/request-context/request-context.middleware";
import { RequestContextService } from "@/common/request-context/request-context.service";
@Module({
    imports: [
        AuthRegisterModule,
        AuthModule,
        CoreModule,
        I18nModule.forRoot({
            loaderOptions: {},
            fallbackLanguage: defaultLanguage,
            loader: TsI18nLoader,
            resolvers: [new CookieResolver(["NEXT_LOCALE"])],
            throwOnMissingKey: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, RequestContextService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestContextMiddleware).forRoutes("*");
    }
}
