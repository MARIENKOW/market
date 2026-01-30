import {
    Prisma,
    ResetPasswordTokenUser,
    User,
    UserSession,
} from "@/generated/prisma";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { mapUserSession } from "@/modules/session/user/session.user.mapper";
import { UserSessionDto } from "@myorg/shared/dto";
import { Injectable } from "@nestjs/common";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { UserService } from "@/modules/user/user.service";
import { ValidationException } from "@/common/exception/validation.exception";

@Injectable()
export class ResetPassswordTokenUserService {
    constructor(
        private prisma: PrismaService,
        private user: UserService,
    ) {}
    private expires = 15 * 60 * 1000; //15 мин
    findByUserId(userId: string): Promise<ResetPasswordTokenUser | null> {
        return this.prisma.resetPasswordTokenUser.findUnique({
            where: { userId },
        });
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
    async checkToken({
        token,
        email,
    }: {
        token: string;
        email?: string;
    }): Promise<User> {
        if (!email)
            throw new ValidationException({
                root: [
                    "pages.forgotPasssword.changePassword.feedback.errors.notFound",
                ],
            });
        const userData = await this.user.findByEmailWithResetToken(email);
        if (!userData || !userData.resetPasswordToken)
            throw new ValidationException({
                root: [
                    "pages.forgotPasssword.changePassword.feedback.errors.notFound",
                ],
            });

        const resetTokenData = userData.resetPasswordToken;
        const isValid = await this.isTokenEqualHash(
            token,
            resetTokenData.tokenHash,
        );
        console.log(isValid);
        if (!isValid) {
            console.log("object1");
            throw new ValidationException({
                root: [
                    "pages.forgotPasssword.changePassword.feedback.errors.notFound",
                ],
            });
        }
        console.log("object");
        if (this.isExpireToken(resetTokenData))
            throw new ValidationException({
                root: [
                    "pages.forgotPasssword.changePassword.feedback.errors.timeout",
                ],
            });

        return userData;
    }
    private async isTokenEqualHash(
        token: string,
        hash: string,
    ): Promise<boolean> {
        const data = await bcrypt.compare(token, hash);
        return data;
    }
    async create(
        userId: string,
    ): Promise<ResetPasswordTokenUser & { token: string; expires: number }> {
        const token = this.createToken();
        const tokenHash = await bcrypt.hash(token, 12);
        const data = await this.prisma.resetPasswordTokenUser.create({
            data: {
                userId,
                expiresAt: new Date(Date.now() + this.expires),
                tokenHash,
            },
        });

        return { ...data, token, expires: this.expires };
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
