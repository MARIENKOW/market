import { HashService } from "@/modules/hash/hash.service";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { SessionUserService } from "@/modules/session/user/session.user.service";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Module({
    providers: [SessionUserService, PrismaService,JwtService,HashService],
    exports: [SessionUserService],
})
export class SessionUserModule {}
