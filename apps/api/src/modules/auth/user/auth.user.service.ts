import { Injectable, Req } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserService } from "@/modules/user/user.service";
import {
    UserChangePasswordDtoOutput,
    UserForgotPasswordDtoOutput,
    UserLoginDtoOutput,
    UserRegisterDtoOutput,
} from "@myorg/shared/form";
import { SessionUserService } from "@/modules/session/user/session.user.service";
import { User, UserSession } from "@/generated/prisma";
import { ValidationException } from "@/common/exception/validation.exception";
import { ResetPasswordTokenUserService } from "@/modules/resetPasswordToken/user/reset.password.token.user.service";
import { MailerService } from "@/modules/mailer/mailer.service";
import { i18nFormatDuration } from "@/helpers/i18n.formatDuration";
import { I18nService } from "nestjs-i18n";
import { ActivateTokenUserService } from "../../activateToken/user/activate.token.user.service";

@Injectable()
export class AuthUserService {
    constructor(
        private user: UserService,
        private sessionUser: SessionUserService,
        private resetToken: ResetPasswordTokenUserService,
        private mailerService: MailerService,
        private activateToken: ActivateTokenUserService,
        private i18n: I18nService,
    ) {}

    async register(body: UserRegisterDtoOutput): Promise<string> {
        const { password, email } = body;

        const emailUnique = await this.user.findByEmail(email);
        if (emailUnique)
            throw new ValidationException<UserRegisterDtoOutput>({
                fields: {
                    email: ["form.email.unique"],
                },
            });

        const hashed = await bcrypt.hash(password, 12);

        const userData = await this.user.create({
            updatedAt: new Date(),
            email,
            passwordHash: hashed,
        });
        if (userData.status === "ACTIVE") {
            return this.i18n.t(
                "pages.register.feedback.success.registerSuccess",
            );
        } else if (userData.status === "NOACTIVE") {
            const { expires, token, id } = await this.activateToken.create(
                userData.id,
            );
            try {
                await this.mailerService.sendActivateToken({
                    to: userData.email,
                    expires,
                    token,
                });
                return this.i18n.t("pages.register.feedback.success.mailSend", {
                    args: { time: i18nFormatDuration(expires) },
                });
            } catch (error) {
                await this.activateToken.delete(id);
                throw error;
            }
        } else {
            throw new ValidationException({
                root: [this.i18n.t("api.FALLBACK_ERR")],
            });
        }
    }
    async login(body: UserLoginDtoOutput): Promise<UserSession> {
        const { email, password } = body;
        const user = await this.user.findByEmail(email);
        if (!user)
            throw new ValidationException<UserLoginDtoOutput>({
                fields: { email: ["form.email.notFound"] },
            });

        if (!user.passwordHash)
            throw new ValidationException<UserLoginDtoOutput>({
                fields: {
                    password: ["form.password.invalid"],
                },
            });
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid)
            throw new ValidationException<UserLoginDtoOutput>({
                fields: {
                    password: ["form.password.invalid"],
                },
            });
        // if (user.status === "NOACTIVE")
        //     throw new ValidationException({
        //         root: [this.i18n.t("pages.login.feedback.errors.mailSend",{args:{time:i18nFormatDuration(1000*60*15)}})],
        //     });
        const sessionUserData = await this.sessionUser.create(user.id);
        return sessionUserData;
    }
    async forgotPassword(body: UserForgotPasswordDtoOutput): Promise<string> {
        const { email } = body;
        const user = await this.user.findByEmail(email);
        if (!user)
            throw new ValidationException<UserForgotPasswordDtoOutput>({
                fields: { email: ["form.email.notFound"] },
            });
        const resetTokenData = await this.resetToken.findByUserId(user.id);
        if (resetTokenData) {
            const isExpireToken = this.resetToken.isExpireToken(resetTokenData);
            if (!isExpireToken) {
                const time = i18nFormatDuration(
                    resetTokenData.expiresAt.getTime() -
                        new Date(Date.now()).getTime(),
                );
                throw new ValidationException<UserForgotPasswordDtoOutput>({
                    root: [
                        this.i18n.t(
                            "pages.forgotPassword.feedback.errors.alreadySent",
                            {
                                args: {
                                    time,
                                },
                            },
                        ),
                    ],
                });
            }
            await this.resetToken.delete(resetTokenData.id);
        }
        const { token, id, expires } = await this.resetToken.create(user.id);
        try {
            await this.mailerService.sendForgotPassword({
                to: user.email,
                token,
                expires,
            });
        } catch (error) {
            await this.resetToken.delete(id);
            throw error;
        }
        return this.i18n.t("pages.forgotPassword.feedback.success", {
            args: {
                time: i18nFormatDuration(expires),
            },
        });
    }
    async changePassword(
        { password }: UserChangePasswordDtoOutput,
        { token, email }: { token: string; email: string },
    ): Promise<true> {
        const { id } = await this.resetToken.checkToken({
            email,
            token,
        });

        await this.user.changePassword({ password, id });
        await this.resetToken.deleteByUserId(id);
        return true;
    }
    async logout(sessionId: string): Promise<true> {
        return await this.sessionUser.delete(sessionId);
    }
}
