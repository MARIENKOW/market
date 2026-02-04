import { PrismaModule } from "@/modules/prisma/prisma.module";
import { ActivateTokenUserService } from "@/modules/activateToken/user/activate.token.user.service";
import { UserModule } from "@/modules/user/user.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [PrismaModule, UserModule],
    providers: [ActivateTokenUserService],
    exports: [ActivateTokenUserService],
})
export class ActivateTokenUserModule {}
