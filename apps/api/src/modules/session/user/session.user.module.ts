import { PrismaService } from "@/modules/prisma/prisma.service";
import { SessionUserService } from "@/modules/session/user/session.user.service";
import { Module } from "@nestjs/common";

@Module({
    providers: [SessionUserService, PrismaService],
    exports: [SessionUserService],
})
export class SessionUserModule {}
