import { SessionUserModule } from "@/modules/auth/user/session/session.user.module";
import { HashService } from "@/modules/hash/hash.service";
import { PrismaModule } from "@/modules/prisma/prisma.module";
import { UserController } from "@/modules/user/user.controller";
import { UserService } from "@/modules/user/user.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [PrismaModule, SessionUserModule],
    providers: [UserService, HashService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
