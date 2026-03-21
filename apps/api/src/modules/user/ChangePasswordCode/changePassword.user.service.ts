import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";

import {
    OTP_MAX_ATTEMPTS,
    OTP_RESEND_COOLDOWN_SECONDS,
    OTP_MAX_RESENDS,
    OTP_BLOCK_DURATION_MS,
} from "@myorg/shared/dto";
import { UserService } from "@/modules/user/user.service";
import { ChangePasswordCodeStatus } from "@/generated/prisma";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { MailerService } from "@/infrastructure/mailer/mailer.service";
import { OtpService } from "@/infrastructure/otp/otp.service";
import { HashService } from "@/infrastructure/hash/hash.service";
import {
    UserChangePasswordCodeDtoOutput,
    UserChangePasswordSettingsDtoOutput,
    UserChangePasswordDtoOutput,
} from "@myorg/shared/form";
import { ValidationException } from "@/common/exception/validation.exception";

@Injectable()
export class ChangePasswordUserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly otpService: OtpService,
        private readonly mailService: MailerService,
        private readonly hash: HashService,
        private readonly user: UserService,
    ) {}

    expires = 15 * 60 * 1000;

    // ── Утилиты блокировки ────────────────────────────────────────────────────

    private getBlockedUntil(blockedAt: Date): Date {
        return new Date(blockedAt.getTime() + OTP_BLOCK_DURATION_MS);
    }

    private isStillBlocked(blockedAt: Date | null): blockedAt is Date {
        if (!blockedAt) return false;
        return this.getBlockedUntil(blockedAt) > new Date();
    }

    private throwBlocked(blockedAt: Date): never {
        throw new ValidationException({
            root: [
                {
                    message: "pages.blocked",
                    type: "error",
                    data: { blockedUntil: this.getBlockedUntil(blockedAt) },
                },
            ],
        });
    }

    // ── Статус ────────────────────────────────────────────────────────────────

    async getStatus(userId: string): Promise<{
        pending: boolean;
        blocked: boolean;
        blockedUntil: Date | null;
        maskedEmail: string | null;
        hasPassword: boolean;
    }> {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            select: { passwordHash: true, email: true },
        });

        const token = await this.getToken(userId);
        const base = { hasPassword: !!user.passwordHash };
        const empty = {
            ...base,
            pending: false,
            blocked: false,
            blockedUntil: null,
            maskedEmail: null,
        };

        if (!token) return empty;

        if (token.status === ChangePasswordCodeStatus.BLOCKED) {
            if (!this.isStillBlocked(token.blockedAt)) return empty;
            return {
                ...base,
                pending: false,
                blocked: true,
                blockedUntil: this.getBlockedUntil(token.blockedAt),
                maskedEmail: null,
            };
        }

        // PENDING — проверяем не истёк ли
        if (token.expiresAt < new Date()) return empty;

        return {
            ...base,
            pending: true,
            blocked: false,
            blockedUntil: null,
            maskedEmail: this.maskEmail(user.email),
        };
    }

    // ── Инициация (есть пароль) ───────────────────────────────────────────────

    async initiate(
        userId: string,
        dto: UserChangePasswordSettingsDtoOutput,
    ): Promise<{ email: string; time: number }> {
        const user = await this.getUserOrThrow(userId);

        if (!user.passwordHash) {
            throw new InternalServerErrorException();
        }

        await this.checkBlock(userId);
        const isPending = await this.isPendingToken(userId);

        if (isPending) return { email: user.email, time: isPending.time };

        const isCurrentValid = await this.hash.compare(
            dto.currentPassword,
            user.passwordHash,
        );
        if (!isCurrentValid) {
            throw new ValidationException<UserChangePasswordSettingsDtoOutput>({
                fields: { currentPassword: ["form.currentPassword.invalid"] },
            });
        }

        const isSame = await this.hash.compare(
            dto.newPassword,
            user.passwordHash,
        );
        if (isSame) {
            throw new ValidationException<UserChangePasswordSettingsDtoOutput>({
                fields: { newPassword: ["form.newPassword.sameAsCurrent"] },
            });
        }

        const { code } = await this.createToken(userId, dto.newPassword);
        await this.mailService.sendChangePasswordCode({
            to: user.email,
            code,
            expires: this.expires,
        });
        return { email: user.email, time: this.expires };
    }

    // ── Инициация (нет пароля — OAuth юзер) ──────────────────────────────────

    async initiateWithoutPassword(
        userId: string,
        dto: UserChangePasswordDtoOutput,
    ): Promise<{ email: string; time: number }> {
        const user = await this.getUserOrThrow(userId);

        if (user.passwordHash) {
            throw new InternalServerErrorException();
        }

        await this.checkBlock(userId);
        const isPending = await this.isPendingToken(userId);

        if (isPending) return { email: user.email, time: isPending.time };

        const { code } = await this.createToken(userId, dto.password);
        await this.mailService.sendChangePasswordCode({
            to: user.email,
            code,
            expires: this.expires,
        });
        return { email: user.email, time: this.expires };
    }

    // ── Подтверждение ─────────────────────────────────────────────────────────

    async confirm(
        userId: string,
        dto: UserChangePasswordCodeDtoOutput,
    ): Promise<void> {
        const token = await this.getActivePending(userId);

        if (token.attempts >= OTP_MAX_ATTEMPTS) {
            await this.blockToken(userId);
            this.throwBlocked(new Date());
        }

        const isValid = this.hash.verifySha256(dto.code, token.codeHash);

        if (!isValid) {
            const newAttempts = token.attempts + 1;
            const isNowBlocked = newAttempts >= OTP_MAX_ATTEMPTS;
            const blockedAt = isNowBlocked ? new Date() : null;

            await this.prisma.changePasswordCodeUser.update({
                where: { userId },
                data: {
                    attempts: { increment: 1 },
                    ...(isNowBlocked && {
                        status: ChangePasswordCodeStatus.BLOCKED,
                        blockedAt,
                    }),
                },
            });

            throw new BadRequestException({
                message: "code_invalid",
                remainingAttempts: OTP_MAX_ATTEMPTS - newAttempts,
                ...(isNowBlocked && {
                    blockedUntil: this.getBlockedUntil(blockedAt!),
                }),
            });
        }

        // Меняем пароль + помечаем успех атомарно
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: {
                    passwordHash: token.newPasswordHash,
                },
            }),
            this.prisma.changePasswordCodeUser.update({
                where: { userId },
                data: { status: ChangePasswordCodeStatus.SUCCESS },
            }),
        ]);
    }

    // ── Повторная отправка ────────────────────────────────────────────────────

    async resend(userId: string): Promise<void> {
        const token = await this.getActivePending(userId);

        if (token.lastResendAt) {
            const cooldownEnd = new Date(
                token.lastResendAt.getTime() +
                    OTP_RESEND_COOLDOWN_SECONDS * 1000,
            );
            if (new Date() < cooldownEnd) {
                throw new ValidationException({
                    root: [
                        {
                            message: "pages.resend.cooldown",
                            type: "error",
                            data: {
                                secondsLeft: Math.ceil(
                                    (cooldownEnd.getTime() - Date.now()) / 1000,
                                ),
                            },
                        },
                    ],
                });
            }
        }

        if (token.resendCount >= OTP_MAX_RESENDS) {
            throw new ValidationException({
                root: [{ message: "pages.resend.limit", type: "error" }],
            });
        }

        const { code, codeHash } = this.generateCode();

        await this.prisma.changePasswordCodeUser.update({
            where: { userId },
            data: {
                codeHash,
                expiresAt: this.makeExpiresAt(),
                attempts: 0,
                resendCount: { increment: 1 },
                lastResendAt: new Date(),
            },
        });

        // await this.mailService.sendChangePasswordCode(token.user.email, code);
    }

    // ── Отмена ────────────────────────────────────────────────────────────────

    async cancel(userId: string): Promise<void> {
        const token = await this.getActivePending(userId);

        // Удаляем запись — не меняем статус
        await this.prisma.changePasswordCodeUser.delete({
            where: { userId },
        });
    }

    // ── Private: блокировка ───────────────────────────────────────────────────

    private async checkBlock(userId: string): Promise<void> {
        const token = await this.getToken(userId);

        if (
            token?.status === ChangePasswordCodeStatus.BLOCKED &&
            this.isStillBlocked(token.blockedAt)
        ) {
            this.throwBlocked(token.blockedAt);
        }
    }

    private async blockToken(userId: string): Promise<void> {
        await this.prisma.changePasswordCodeUser.update({
            where: { userId },
            data: {
                status: ChangePasswordCodeStatus.BLOCKED,
                blockedAt: new Date(),
            },
        });
    }

    // ── Private: токен ────────────────────────────────────────────────────────

    /**
     * Запрещает повторную инициацию если уже есть активный PENDING токен.
     * Пользователь должен либо дождаться истечения, либо отменить через cancel,
     * либо запросить повторный код через resend.
     */
    private async isPendingToken(
        userId: string,
    ): Promise<false | { time: number }> {
        const token = await this.getToken(userId);

        if (
            token?.status === ChangePasswordCodeStatus.PENDING &&
            token.expiresAt > new Date()
        ) {
            return { time: token.expiresAt.getTime() - Date.now() };
        }
        return false;
    }

    private async createToken(
        userId: string,
        newPassword: string,
    ): Promise<{ code: string }> {
        const { code, codeHash } = this.generateCode();
        const newPasswordHash = await this.hash.hash(newPassword);

        // upsert — одна запись на юзера, перезаписываем если была (истёкшая или SUCCESS)
        await this.prisma.changePasswordCodeUser.upsert({
            where: { userId },
            create: {
                userId,
                codeHash,
                newPasswordHash,
                expiresAt: this.makeExpiresAt(),
            },
            update: {
                codeHash,
                newPasswordHash,
                expiresAt: this.makeExpiresAt(),
                status: ChangePasswordCodeStatus.PENDING,
                attempts: 0,
                resendCount: 0,
                lastResendAt: null,
                blockedAt: null,
            },
        });

        // await this.mailService.sendChangePasswordCode(email, code);

        return { code };
    }

    /** Возвращает токен или null — без фильтрации по статусу */
    private getToken(userId: string) {
        return this.prisma.changePasswordCodeUser.findUnique({
            where: { userId },
        });
    }

    /**
     * Возвращает активный PENDING токен или бросает NotFoundException.
     * Используется в confirm, resend, cancel.
     */
    private async getActivePending(userId: string) {
        const token = await this.getToken(userId);

        if (
            !token ||
            token.status !== ChangePasswordCodeStatus.PENDING ||
            token.expiresAt < new Date()
        ) {
            throw new NotFoundException("change_password_request_not_found");
        }

        return token;
    }

    private generateCode(): { code: string; codeHash: string } {
        const code = this.otpService.generate();
        return { code, codeHash: this.hash.sha256(code) };
    }

    private makeExpiresAt(): Date {
        return new Date(Date.now() + this.expires);
    }

    // ── Private: юзер ────────────────────────────────────────────────────────

    private getUserOrThrow(userId: string) {
        return this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            select: { id: true, email: true, passwordHash: true },
        });
    }

    private maskEmail(email: string): string {
        const [local, domain] = email.split("@");
        return `${local.slice(0, 2)}***@${domain}`;
    }
}
