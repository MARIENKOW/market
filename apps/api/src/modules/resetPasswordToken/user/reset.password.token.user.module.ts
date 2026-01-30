import { PrismaModule } from "@/modules/prisma/prisma.module";
import ResetPasswordTokenUserController from "@/modules/resetPasswordToken/user/reset.password.token.user.controller";
import { ResetPassswordTokenUserService } from "@/modules/resetPasswordToken/user/reset.password.token.user.service";
import { UserModule } from "@/modules/user/user.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [PrismaModule, UserModule],
    providers: [ResetPassswordTokenUserService],
    controllers: [ResetPasswordTokenUserController],
    exports: [ResetPassswordTokenUserService],
})

export class ResetPasswordTokenUserModule {}
