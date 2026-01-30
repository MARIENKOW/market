import { Prisma, ResetPasswordTokenUser, User } from "@/generated/prisma";
import { PrismaModule } from "@/modules/prisma/prisma.module";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { SessionUserService } from "@/modules/session/user/session.user.service";
import { mapUser } from "@/modules/user/user.mapper";
import { UserDto } from "@myorg/shared/dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private sessionUser: SessionUserService,
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
        const hashed = await bcrypt.hash(password, 12);
        return this.prisma.user.update({
            where: { id },
            data: { passwordHash: hashed },
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
    async findBySessionId(sessionId: string): Promise<User | null> {
        const SessionUserData = await this.sessionUser.findById(sessionId);
        if (!SessionUserData) throw new UnauthorizedException();

        const UserData = this.findById(SessionUserData.userId);

        if (!UserData) throw new UnauthorizedException();
        return UserData;
    }

    create(data: User): Promise<User> {
        return this.prisma.user.create({ data });
    }
}
