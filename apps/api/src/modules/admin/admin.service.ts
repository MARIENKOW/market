import { Prisma, Admin } from "@/generated/prisma";
import { SessionAdminService } from "@/modules/auth/admin/session/session.admin.service";
import { HashService } from "@/infrastructure/hash/hash.service";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AdminService {
    constructor(
        private prisma: PrismaService,
        private session: SessionAdminService,
        private hash: HashService,
    ) {}

    findById(id: string): Promise<Admin | null> {
        return this.find({ where: { id } });
    }
    async changeTheme({
        id,
        theme,
    }: {
        theme: string;
        id: string;
    }): Promise<true> {
        await this.prisma.admin.update({ where: { id }, data: { theme } });
        return true;
    }

    async changeLocale({
        id,
        locale,
    }: {
        locale: string;
        id: string;
    }): Promise<true> {
        await this.prisma.admin.update({ where: { id }, data: { locale } });
        return true;
    }
    async changePassword({
        password,
        id,
    }: {
        password: string;
        id: string;
    }): Promise<Admin | null> {
        const hashed = await this.hash.hash(password);
        return this.prisma.admin.update({
            where: { id },
            data: { passwordHash: hashed },
        });
    }
    async activate(id: string): Promise<Admin | null> {
        return this.prisma.admin.update({
            where: { id },
            data: { status: "ACTIVE" },
        });
    }
    findByEmail(email: string): Promise<Admin | null> {
        return this.find({ where: { email } });
    }

    async find(params: Prisma.AdminFindUniqueArgs): Promise<Admin | null> {
        return this.prisma.admin.findUnique(params);
    }

    async findByEmailWithResetToken(
        email: string,
    ): Promise<Prisma.AdminGetPayload<{
        include: {
            resetPasswordToken: true;
        };
    }> | null> {
        return await this.prisma.admin.findUnique({
            where: { email },
            include: {
                resetPasswordToken: true,
            },
        });
    }
    async findBySessionId(sessionId: string): Promise<Admin | null> {
        const SessionData = await this.session.findById(sessionId);
        if (!SessionData) throw new UnauthorizedException();

        const admin = this.findById(SessionData.adminId);

        if (!admin) throw new UnauthorizedException();
        return admin;
    }

    create(data: Prisma.AdminCreateInput): Promise<Admin> {
        return this.prisma.admin.create({ data });
    }
}
