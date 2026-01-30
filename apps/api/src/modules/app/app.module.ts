import { AppController } from "@/modules/app/app.controller";
import { AppService } from "@/modules/app/app.service";
import { AuthModule, AuthRegisterModule } from "@/modules/auth/auth.module";
import { CoreModule } from "@/modules/core/core.module";
import { Module } from "@nestjs/common";
import { AcceptLanguageResolver, I18nModule } from "nestjs-i18n";
import { defaultLanguage, I18N_PATH } from "@myorg/shared/i18n";
console.log(I18N_PATH);

@Module({
    imports: [
        AuthRegisterModule,
        AuthModule,
        CoreModule,
        I18nModule.forRoot({
            fallbackLanguage: defaultLanguage,
            
            loaderOptions: {
                path: I18N_PATH,
                
                watch: true,
            },
            resolvers: [AcceptLanguageResolver],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
