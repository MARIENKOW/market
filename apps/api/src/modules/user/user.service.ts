import { Prisma, ResetPasswordTokenUser, User } from "@/generated/prisma";
import { HashService } from "@/modules/hash/hash.service";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { SessionUserService } from "@/modules/session/user/session.user.service";

import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private sessionUser: SessionUserService,
        private hash: HashService,
    ) {}

    findById(id: string): Promise<User | null> {
        return this.find({ where: { id } });
    }
    async changePassword({
        password,
        id,
    }: {
        password: string;
        id: string;
    }): Promise<User | null> {
        const hashed = await this.hash.hash(password);
        return this.prisma.user.update({
            where: { id },
            data: { passwordHash: hashed },
        });
    }
    async activate(id: string): Promise<User | null> {
        return this.prisma.user.update({
            where: { id },
            data: { status: "ACTIVE" },
        });
    }
    findByEmail(email: string): Promise<User | null> {
        return this.find({ where: { email } });
    }

    async find(params: Prisma.UserFindUniqueArgs): Promise<User | null> {
        return this.prisma.user.findUnique(params);
    }

    async findByEmailWithResetToken(
        email: string,
    ): Promise<Prisma.UserGetPayload<{
        include: {
            resetPasswordToken: true;
        };
    }> | null> {
        return await this.prisma.user.findUnique({
            where: { email },
            include: {
                resetPasswordToken: true,
            },
        });
    }
    async findByEmailWithActivateToken(
        email: string,
    ): Promise<Prisma.UserGetPayload<{
        include: {
            activateToken: true;
        };
    }> | null> {
        return await this.prisma.user.findUnique({
            where: { email },
            include: {
                activateToken: true,
            },
        });
    }
    async findBySessionId(sessionId: string): Promise<User | null> {
        const SessionUserData = await this.sessionUser.findById(sessionId);
        if (!SessionUserData) throw new UnauthorizedException();

        const UserData = this.findById(SessionUserData.userId);

        if (!UserData) throw new UnauthorizedException();
        return UserData;
    }

    create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }
}
