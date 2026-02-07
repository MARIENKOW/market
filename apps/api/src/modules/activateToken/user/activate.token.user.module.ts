import { PrismaModule } from "@/modules/prisma/prisma.module";
import { ActivateTokenUserService } from "@/modules/activateToken/user/activate.token.user.service";
import { UserModule } from "@/modules/user/user.module";
import { Module } from "@nestjs/common";
import { MailerModule } from "@/modules/mailer/mailer.module";

@Module({
    imports: [PrismaModule, UserModule, MailerModule],
    providers: [ActivateTokenUserService],
    exports: [ActivateTokenUserService],
})
export class ActivateTokenUserModule {}
