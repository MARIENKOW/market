import { SessionUserService } from "@/modules/auth/user/session/session.user.service";
import { HashService } from "@/modules/hash/hash.service";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Module({
    providers: [SessionUserService, PrismaService, JwtService, HashService],
    exports: [SessionUserService],
})
export class SessionUserModule {}
