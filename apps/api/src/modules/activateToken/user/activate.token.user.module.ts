import { PrismaModule } from "@/modules/prisma/prisma.module";
import { ActivateTokenUserService } from "@/modules/activateToken/user/activate.token.user.service";
import { UserModule } from "@/modules/user/user.module";
import { Module } from "@nestjs/common";
import { MailerModule } from "@/modules/mailer/mailer.module";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "@/modules/hash/hash.service";

@Module({
    imports: [PrismaModule, UserModule, MailerModule],
    providers: [ActivateTokenUserService, JwtService, HashService],
    exports: [ActivateTokenUserService],
})
export class ActivateTokenUserModule {}
