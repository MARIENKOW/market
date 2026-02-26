import { Module } from "@nestjs/common";
import { AuthUserController } from "@/modules/auth/user/auth.user.controller";
import { AuthUserService } from "@/modules/auth/user/auth.user.service";
import { UserModule } from "@/modules/user/user.module";
import { SessionUserService } from "@/modules/session/user/session.user.service";
import { ResetPasswordTokenUserModule } from "@/modules/resetPasswordToken/user/reset.password.token.user.module";
import { ActivateTokenUserModule } from "../../activateToken/user/activate.token.user.module";
import { HashService } from "@/modules/hash/hash.service";
import { JwtService } from "@nestjs/jwt";
import { RequestContextService } from "@/common/request-context/request-context.service";

@Module({
    imports: [
        UserModule,
        ResetPasswordTokenUserModule,
        ActivateTokenUserModule,
    ],
    providers: [
        AuthUserService,
        SessionUserService,
        HashService,
        JwtService,
        RequestContextService,
    ],
    controllers: [AuthUserController],
    exports: [AuthUserService],
})
export class AuthUserModule {}
