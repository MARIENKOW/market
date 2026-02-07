import { ActivateTokenUser, User } from "@/generated/prisma";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { UserService } from "@/modules/user/user.service";
import { ValidationException } from "@/common/exception/validation.exception";
import { I18nService } from "nestjs-i18n";
import { MailerService } from "@/modules/mailer/mailer.service";
import { MessageStructure } from "@myorg/shared/i18n";

@Injectable()
export class ActivateTokenUserService {
    constructor(
        private prisma: PrismaService,
        private user: UserService,
        private i18n: I18nService<MessageStructure>,
        private mailerService: MailerService,
    ) {}
    private expires = 30 * 60 * 1000; //15 мин

    async isHaveUserToken(userData: User): Promise<ActivateTokenUser | null> {
        const activateToken = await this.findByUserId(userData.id);
        if (!activateToken) return null;
        const isExpire = await this.isExpireAndDelete(activateToken);
        if (isExpire) return null;
        return activateToken;
    }
    async createAndSend(userData: User): Promise<number> {
        const { expires, token, id } = await this.create(userData.id);
        try {
            await this.mailerService.sendActivateToken({
                to: userData.email,
                expires,
                token,
            });
            return expires;
        } catch (error) {
            await this.delete(id);
            throw error;
        }
    }
    async findByUserId(userId: string): Promise<ActivateTokenUser | null> {
        return this.prisma.activateTokenUser.findUnique({
            where: { userId },
        });
    }
    async findById(id: string): Promise<ActivateTokenUser | null> {
        return this.prisma.activateTokenUser.findUnique({
            where: { id },
        });
    }
    private createToken(): string {
        return crypto.randomBytes(32).toString("hex");
    }
    isExpireToken(model: ActivateTokenUser): boolean {
        const time = model.expiresAt.getTime() - new Date().getTime();
        if (time <= 0) return true;
        return false;
    }
    async isExpireAndDelete(
        activateToken: ActivateTokenUser,
    ): Promise<boolean> {
        const isExpire = this.isExpireToken(activateToken);
        if (isExpire) {
            await this.delete(activateToken.id);
        }
        return isExpire;
    }
    async isTokenEqualHash(token: string, hash: string): Promise<boolean> {
        const data = await bcrypt.compare(token, hash);
        return data;
    }
    async create(
        userId: string,
    ): Promise<ActivateTokenUser & { token: string; expires: number }> {
        const token = this.createToken();
        const tokenHash = await bcrypt.hash(token, 12);
        const data = await this.prisma.activateTokenUser.create({
            data: {
                userId,
                expiresAt: new Date(Date.now() + this.expires),
                tokenHash,
            },
        });

        return { ...data, token, expires: this.expires };
    }
    async delete(id: string): Promise<true> {
        await this.prisma.activateTokenUser.delete({ where: { id } });
        return true;
    }
    async deleteByUserId(userId: string): Promise<true> {
        await this.prisma.activateTokenUser.delete({ where: { userId } });
        return true;
    }
}
