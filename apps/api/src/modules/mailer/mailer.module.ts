import { MailerService } from "@/modules/mailer/mailer.service";
import { Module } from "@nestjs/common";

@Module({
    providers: [MailerService],
    exports: [MailerService],
})
export class MailerModule {}
