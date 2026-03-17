import { Module } from "@nestjs/common";
import { AuthAdminController } from "@/modules/auth/admin/auth.admin.controller";
import { AuthAdminService } from "@/modules/auth/admin/auth.admin.service";
import { AdminModule } from "@/modules/admin/admin.module";
import { ResetPasswordTokenAdminModule } from "@/modules/resetPasswordToken/admin/reset.password.token.admin.module";
import { HashService } from "@/modules/hash/hash.service";
import { JwtService } from "@nestjs/jwt";
import { OAuth2Client } from "google-auth-library";
import { SessionAdminModule } from "@/modules/auth/admin/session/session.admin.module";
import { MailerModule } from "@/modules/mailer/mailer.module";

@Module({
    imports: [
        AdminModule,
        ResetPasswordTokenAdminModule,
        SessionAdminModule,
        MailerModule,
    ],
    providers: [AuthAdminService, HashService, OAuth2Client, JwtService],
    controllers: [AuthAdminController],
    exports: [AuthAdminService],
})
export class AuthAdminModule {}
