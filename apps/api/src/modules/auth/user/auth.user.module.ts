import { Module } from "@nestjs/common";
import { AuthUserController } from "@/modules/auth/user/auth.user.controller";
import { AuthUserService } from "@/modules/auth/user/auth.user.service";
import { UserModule } from "@/modules/user/user.module";
import { ResetPasswordTokenUserModule } from "@/modules/resetPasswordToken/user/reset.password.token.user.module";
import { ActivateTokenUserModule } from "../../activateToken/activate.token.user.module";
import { HashService } from "@/modules/hash/hash.service";
import { JwtService } from "@nestjs/jwt";
import { OAuth2Client } from "google-auth-library";
import { SessionUserModule } from "@/modules/auth/user/session/session.user.module";
import { MailerModule } from "@/modules/mailer/mailer.module";

@Module({
    imports: [
        UserModule,
        ResetPasswordTokenUserModule,
        ActivateTokenUserModule,
        MailerModule,
        SessionUserModule,
    ],
    providers: [AuthUserService, HashService, OAuth2Client, JwtService],
    controllers: [AuthUserController],
    exports: [AuthUserService],
})
export class AuthUserModule {}
