import { Prisma, UserSession } from "@/generated/prisma";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { mapUserSession } from "@/modules/session/user/session.user.mapper";
import { UserSessionDto } from "@myorg/shared/dto";
import { Injectable } from "@nestjs/common";
import crypto from "crypto";

@Injectable()
export class SessionUserService {
    constructor(private prisma: PrismaService) {}

    findById(id: string): Promise<UserSession | null> {
        return this.prisma.userSession.findUnique({
            where: { id },
        });
    }
    async touch(id: string): Promise<Date> {
        const lastUsedAt = new Date();
        await this.prisma.userSession.update({
            where: { id },
            data: { lastUsedAt },
        });
        return lastUsedAt;
    }
    private createId(): string {
        return crypto.randomBytes(32).toString("hex");
    }
    async create(userId: string): Promise<UserSession> {
        const id = this.createId();

        const data = await this.prisma.userSession.create({
            data: { userId, id, lastUsedAt: new Date() },
        });

        return data;
    }
    async delete(sessionId: string): Promise<true> {
        await this.prisma.userSession.delete({ where: { id: sessionId } });
        return true;
    }
}
