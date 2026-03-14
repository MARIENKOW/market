import { HashService } from "@/modules/hash/hash.service";
import { MailerModule } from "@/modules/mailer/mailer.module";
import { PrismaModule } from "@/modules/prisma/prisma.module";
import ResetPasswordTokenUserController from "@/modules/resetPasswordToken/user/reset.password.token.user.controller";
import { ResetPasswordTokenUserService } from "@/modules/resetPasswordToken/user/reset.password.token.user.service";
import { UserModule } from "@/modules/user/user.module";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [PrismaModule, UserModule, MailerModule],
    providers: [ResetPasswordTokenUserService, HashService, JwtService],
    controllers: [ResetPasswordTokenUserController],
    exports: [ResetPasswordTokenUserService],
})
export class ResetPasswordTokenUserModule {}
