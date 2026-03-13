import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "@/modules/user/user.service";
import {
    UserChangePasswordDtoOutput,
    UserForgotPasswordDtoOutput,
    UserLoginDtoOutput,
    UserRegisterDtoOutput,
} from "@myorg/shared/form";
import { SessionUserService } from "@/modules/session/user/session.user.service";
import { ValidationException } from "@/common/exception/validation.exception";
import { ResetPasswordTokenUserService } from "@/modules/resetPasswordToken/user/reset.password.token.user.service";
import { i18nFormatDuration } from "@/helpers/i18n.formatDuration";
import { ActivateTokenUserService } from "../../activateToken/user/activate.token.user.service";
import { MessageStructure } from "@myorg/shared/i18n";
import { I18nService } from "nestjs-i18n";
import { HashService } from "@/modules/hash/hash.service";
import { RequestContextService } from "@/common/request-context/request-context.service";
@Injectable()
export class AuthUserService {
    constructor(
        private user: UserService,
        private sessionUser: SessionUserService,
        private resetToken: ResetPasswordTokenUserService,
        private activateToken: ActivateTokenUserService,
        private i18n: I18nService<MessageStructure>,
        private hash: HashService,
        private context: RequestContextService,
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

        const hashed = await this.hash.hash(password);

        const userData = await this.user.create({
            updatedAt: new Date(),
            email,
            passwordHash: hashed,
        });
        if (userData.status === "NOACTIVE") {
            const origin = this.context.origin;
            const expires = await this.activateToken.createAndSend(
                userData,
                origin,
            );
            return this.i18n.t("pages.register.feedback.success.mailSend", {
                args: { time: i18nFormatDuration(expires) },
            });
        }
        return this.i18n.t("pages.register.feedback.success.registerSuccess");
    }
    async refresh(
        refreshTokenUser: string,
    ): Promise<{ accessTokenUser: string; refreshTokenUser: string }> {
        const { accessToken, refreshToken } =
            await this.sessionUser.refresh(refreshTokenUser);

        return { accessTokenUser: accessToken, refreshTokenUser: refreshToken };
    }
    async login(
        body: UserLoginDtoOutput,
        { ip, userAgent }: { ip?: string; userAgent?: string },
    ): Promise<{ accessToken: string; refreshToken: string }> {
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
        const valid = await this.hash.compare(password, user.passwordHash);
        if (!valid)
            throw new ValidationException<UserLoginDtoOutput>({
                fields: {
                    password: ["form.password.invalid"],
                },
            });
        if (user.status === "NOACTIVE") {
            const activateTokenData = await this.activateToken.findByUserId(
                user.id,
            );

            if (!activateTokenData)
                throw new ValidationException({
                    root: [
                        {
                            message: this.i18n.t(
                                "pages.login.feedback.errors.sendMail",
                            ),
                            type: "error",
                            data: { isShowButton: true },
                        },
                    ],
                });
            const isExpire =
                this.activateToken.isExpireToken(activateTokenData);
            if (isExpire)
                throw new ValidationException({
                    root: [
                        {
                            message: this.i18n.t(
                                "pages.login.feedback.errors.expire",
                            ),
                            type: "error",
                            data: { isShowButton: true },
                        },
                    ],
                });
            throw new ValidationException({
                root: [
                    {
                        message: this.i18n.t(
                            "pages.login.feedback.errors.alreadySend",
                            {
                                args: {
                                    time: i18nFormatDuration(
                                        activateTokenData.expiresAt.getTime() -
                                            new Date(Date.now()).getTime(),
                                    ),
                                },
                            },
                        ),
                        type: "error",
                    },
                ],
            });
        }

        const sessionUserData = await this.sessionUser.create({
            userId: user.id,
            ip,

            userAgent,
        });
        return sessionUserData;
    }
    async sendActivate({ email }: { email?: string }) {
        if (!email) throw new NotFoundException();
        const userData = await this.user.findByEmail(email);
        if (!userData) throw new NotFoundException();
        if (userData.status === "ACTIVE")
            throw new ValidationException({
                root: [
                    {
                        message: this.i18n.t(
                            "features.activate.error.alreadyActive",
                        ),
                        type: "info",
                    },
                ],
            });

        const activateToken =
            await this.activateToken.isHaveUserToken(userData);
        if (activateToken)
            throw new ValidationException({
                root: [
                    {
                        message: this.i18n.t(
                            "features.activate.error.alreadySend",
                            {
                                args: {
                                    time: i18nFormatDuration(
                                        activateToken.expiresAt.getTime() -
                                            new Date(Date.now()).getTime(),
                                    ),
                                },
                            },
                        ),
                        type: "info",
                    },
                ],
            });

        const origin = this.context.origin;
        const expires = await this.activateToken.createAndSend(
            userData,
            origin,
        );
        return this.i18n.t("features.activate.success.sendSuccess", {
            args: { time: i18nFormatDuration(expires) },
        });
    }
    async activate({
        token,
        email,
    }: {
        token: string;
        email?: string;
    }): Promise<true> {
        if (!email) throw new NotFoundException();
        const userData = await this.user.findByEmail(email);
        if (!userData) throw new NotFoundException();
        if (userData.status === "ACTIVE") throw new NotFoundException();
        const activateTokenData = await this.activateToken.findByUserId(
            userData.id,
        );
        if (!activateTokenData) throw new NotFoundException();
        const isValid = await this.activateToken.isTokenEqualHash(
            token,
            activateTokenData.tokenHash,
        );
        if (!isValid) throw new NotFoundException();

        const isExpire = this.activateToken.isExpireToken(activateTokenData);
        if (isExpire)
            throw new ValidationException({
                root: [
                    {
                        message: this.i18n.t(
                            "pages.activate.feedback.errors.expired",
                        ),
                        type: "error",
                        data: { isShowButton: true },
                    },
                ],
            });
        await this.user.activate(userData.id);
        await this.activateToken.deleteByUserId(userData.id);
        return true;
    }
    async forgotPassword({
        email,
    }: UserForgotPasswordDtoOutput): Promise<string> {
        const user = await this.user.findByEmail(email);
        if (!user)
            throw new ValidationException<UserForgotPasswordDtoOutput>({
                fields: { email: ["form.email.notFound"] },
            });

        const resetTokenData = await this.resetToken.isHaveUserToken(user);
        if (resetTokenData)
            throw new ValidationException({
                root: [
                    {
                        message: this.i18n.t(
                            "pages.forgotPassword.feedback.errors.alreadySent",
                            {
                                args: {
                                    time: i18nFormatDuration(
                                        resetTokenData.expiresAt.getTime() -
                                            new Date(Date.now()).getTime(),
                                    ),
                                },
                            },
                        ),
                        type: "error",
                    },
                ],
            });
        const origin = this.context.origin;
        const expires = await this.resetToken.createAndSend(user, origin);
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
        if (!email) throw new NotFoundException();
        const userData = await this.user.findByEmail(email);
        if (!userData) throw new NotFoundException();
        const resetPasswordToken = await this.resetToken.findByUserId(
            userData.id,
        );
        if (!resetPasswordToken) throw new NotFoundException();
        const isValid = await this.resetToken.isTokenEqualHash(
            token,
            resetPasswordToken.tokenHash,
        );
        if (!isValid) throw new NotFoundException();

        if (this.resetToken.isExpireToken(resetPasswordToken))
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

        await this.user.changePassword({ password, id: userData.id });
        await this.resetToken.deleteByUserId(userData.id);
        return true;
    }
    async logout(sessionId: string): Promise<true> {
        return await this.sessionUser.delete(sessionId);
    }
}
