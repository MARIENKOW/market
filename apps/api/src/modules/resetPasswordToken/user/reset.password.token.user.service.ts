import { ResetPasswordTokenUser, User } from "@/generated/prisma";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { UserService } from "@/modules/user/user.service";
import { ValidationException } from "@/common/exception/validation.exception";
import { I18nService } from "nestjs-i18n";
import { MessageStructure } from "@myorg/shared/i18n";
import { MailerService } from "@/modules/mailer/mailer.service";

@Injectable()
export class ResetPasswordTokenUserService {
    constructor(
        private prisma: PrismaService,
        private mailerService: MailerService,
        private user: UserService,
        private i18n: I18nService<MessageStructure>,
    ) {}
    private expires = 15 * 60 * 1000; //15 мин
    findByUserId(userId: string): Promise<ResetPasswordTokenUser | null> {
        return this.prisma.resetPasswordTokenUser.findUnique({
            where: { userId },
        });
    }
    async isHaveUserToken(user: User): Promise<ResetPasswordTokenUser | null> {
        const resetTokenData = await this.findByUserId(user.id);
        if (!resetTokenData) return null;
        const isExpireToken = this.isExpireToken(resetTokenData);
        if (isExpireToken) {
            await this.delete(resetTokenData.id);
            return null;
        }
        return resetTokenData;
    }
    async createAndSend(user: User, origin: string): Promise<number> {
        const { token, id } = await this.create(user.id);
        try {
            await this.mailerService.sendForgotPassword({
                to: user.email,
                token,
                expires: this.expires,
                origin,
            });
            return this.expires;
        } catch (error) {
            await this.delete(id);
            throw error;
        }
    }
    findById(id: string): Promise<ResetPasswordTokenUser | null> {
        return this.prisma.resetPasswordTokenUser.findUnique({
            where: { id },
        });
    }
    private createToken(): string {
        return crypto.randomBytes(32).toString("hex");
    }
    isExpireToken(model: ResetPasswordTokenUser): boolean {
        const time = model.expiresAt.getTime() - new Date().getTime();
        if (time <= 0) return true;
        return false;
    }
    async check({
        token,
        email,
    }: {
        token: string;
        email?: string;
    }): Promise<true> {
        if (!email) throw new NotFoundException();
        const userData = await this.user.findByEmail(email);
        if (!userData) throw new NotFoundException();
        const resetPasswordToken = await this.findByUserId(userData.id);
        if (!resetPasswordToken) throw new NotFoundException();
        const isValid = await this.isTokenEqualHash(
            token,
            resetPasswordToken.tokenHash,
        );
        if (!isValid) throw new NotFoundException();

        if (this.isExpireToken(resetPasswordToken))
            throw new ValidationException({
                root: [
                    {
                        message: this.i18n.t(
                            "pages.forgotPassword.changePassword.feedback.errors.timeout",
                        ),
                        type: "error",
                    },
                ],
            });

        return true;
    }
    async isTokenEqualHash(token: string, hash: string): Promise<boolean> {
        const data = await bcrypt.compare(token, hash);
        return data;
    }
    async create(
        userId: string,
    ): Promise<ResetPasswordTokenUser & { token: string }> {
        const token = this.createToken();
        const tokenHash = await bcrypt.hash(token, 12);
        const data = await this.prisma.resetPasswordTokenUser.create({
            data: {
                userId,
                expiresAt: new Date(Date.now() + this.expires),
                tokenHash,
            },
        });

        return { ...data, token };
    }
    async delete(id: string): Promise<true> {
        await this.prisma.resetPasswordTokenUser.delete({ where: { id } });
        return true;
    }
    async deleteByUserId(userId: string): Promise<true> {
        await this.prisma.resetPasswordTokenUser.delete({ where: { userId } });
        return true;
    }
}
