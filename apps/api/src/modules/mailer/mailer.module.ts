import { I18nService } from "@/lib/i18n/i18n.service";
import { MailerService } from "@/modules/mailer/mailer.service";
import { Module } from "@nestjs/common";

@Module({
    providers: [MailerService,I18nService],
    exports: [MailerService],
})
export class MailerModule {}
