import { UserSession } from "@/generated/prisma";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as crypto from "crypto";
import { HashService } from "@/modules/hash/hash.service";

export type AccessTokenUserPayload = { userId: string; sessionId: string };
export type RefreshTokenUserPayload = { userId: string; sessionId: string };
@Injectable()
export class SessionUserService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private hash: HashService,
    ) {}

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
    normalizeIp(ip: string): string {
        if (ip.startsWith("::ffff:")) {
            return ip.replace("::ffff:", "");
        }
        return ip;
    }
    generateAccessToken(playload: AccessTokenUserPayload): string {
        return this.jwt.sign(playload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: "10s",
        });
    }

    verifyAccessToken(accessTokenUser: string): AccessTokenUserPayload {
        return this.jwt.verify(accessTokenUser, {
            secret: process.env.JWT_ACCESS_SECRET,
        });
    }
    generateRefreshToken(playload: AccessTokenUserPayload): string {
        return this.jwt.sign(playload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: "30d",
        });

        
    }
    verifyRefreshToken(refreshTokenUser: string): AccessTokenUserPayload {
        return this.jwt.verify(refreshTokenUser, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
    }
async refresh(refreshTokenUser: string): Promise<{
    accessToken: string;
    refreshToken: string;
}> {
    let payload: RefreshTokenUserPayload;
    try {
        payload = this.verifyRefreshToken(refreshTokenUser);
    } catch (error) {
        throw new UnauthorizedException();
    }

    const sessionData = await this.findById(payload.sessionId);
    if (!sessionData) throw new UnauthorizedException();

    // Проверяем текущий токен
    const isValid = this.hash.verifySha256(
        refreshTokenUser,
        sessionData.refreshTokenHash,
    );

    if (!isValid) {
        // Проверяем предыдущий токен (grace period)
        const isPreviousValid =
            sessionData.previousRefreshTokenHash &&
            sessionData.previousTokenExpiresAt &&
            sessionData.previousTokenExpiresAt > new Date() &&
            this.hash.verifySha256(
                refreshTokenUser,
                sessionData.previousRefreshTokenHash,
            );

        if (!isPreviousValid) throw new UnauthorizedException();
    }

    const accessToken = this.generateAccessToken({
        userId: sessionData.userId,
        sessionId: sessionData.id,
    });
    const refreshToken = this.generateRefreshToken({
        userId: sessionData.userId,
        sessionId: sessionData.id,
    });

    const refreshTokenHash = this.hash.sha256(refreshToken);

    await this.prisma.userSession.update({
        where: { id: sessionData.id },
        data: {
            refreshTokenHash,
            previousRefreshTokenHash: sessionData.refreshTokenHash, // старый становится previous
            previousTokenExpiresAt: new Date(Date.now() + 30 * 1000), // живёт 30 секунд
            lastUsedAt: new Date(),
        },
    });

    return { accessToken, refreshToken };
}
    async create({
        userId,
        ip,
        userAgent,
    }: {
        userId: string;
        ip?: string;
        userAgent?: string;
    }): Promise<{ accessToken: string; refreshToken: string }> {
        const id = this.createId();
        const normalizeIp = ip ? this.normalizeIp(ip) : "";
        const refreshToken = this.generateRefreshToken({
            userId,
            sessionId: id,
        });
        const refreshTokenHash = this.hash.sha256(refreshToken);

        const data = await this.prisma.userSession.create({
            data: {
                userId,
                id,
                refreshTokenHash,
                ip: normalizeIp,
                userAgent,
                lastUsedAt: new Date(),
            },
        });

        const accessToken = this.generateAccessToken({
            userId,
            sessionId: id,
        });

        return { refreshToken, accessToken };
    }
    async delete(sessionId: string): Promise<true> {
        await this.prisma.userSession.delete({ where: { id: sessionId } });
        return true;
    }
}
