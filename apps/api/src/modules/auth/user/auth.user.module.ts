import { Module } from "@nestjs/common";
import { AuthUserController } from "@/modules/auth/user/auth.user.controller";
import { AuthUserService } from "@/modules/auth/user/auth.user.service";
import { UserModule } from "@/modules/user/user.module";
import { SessionUserService } from "@/modules/session/user/session.user.service";

@Module({
    imports: [UserModule],
    providers: [AuthUserService, SessionUserService],
    controllers: [AuthUserController],
    exports: [AuthUserService],
})
export class AuthUserModule {}
