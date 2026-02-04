import { Module } from "@nestjs/common";
import { AuthUserController } from "@/modules/auth/user/auth.user.controller";
import { AuthUserService } from "@/modules/auth/user/auth.user.service";
import { UserModule } from "@/modules/user/user.module";
import { SessionUserService } from "@/modules/session/user/session.user.service";
import { MailerModule } from "@/modules/mailer/mailer.module";
import { ResetPasswordTokenUserModule } from "@/modules/resetPasswordToken/user/reset.password.token.user.module";
import { ActivateTokenUserModule } from "../../activateToken/user/activate.token.user.module";

@Module({
    imports: [
        UserModule,
        MailerModule,
        ResetPasswordTokenUserModule,
        ActivateTokenUserModule,
    ],
    providers: [AuthUserService, SessionUserService],
    controllers: [AuthUserController],
    exports: [AuthUserService],
})
export class AuthUserModule {}
