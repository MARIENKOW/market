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
import { ResetPassswordTokenUserService } from "@/modules/resetPasswordToken/user/reset.password.token.user.service";
import { MailerService } from "@/modules/mailer/mailer.service";
import { Request } from "express";

@Injectable()
export class AuthUserService {
    constructor(
        private user: UserService,
        private sessionUser: SessionUserService,
        private resetToken: ResetPassswordTokenUserService,
        private mailerService: MailerService,
    ) {}

    async register(body: UserRegisterDtoOutput): Promise<User> {
        const { password, email } = body;

        const emailUnique = await this.user.findByEmail(email);
        if (emailUnique)
            throw new ValidationException<UserRegisterDtoOutput>({
                fields: {
                    email: ["form.email.unique"],
                },
            });

        const hashed = await bcrypt.hash(password, 12);

        return this.user.create({
            id: "dasd",
            status: "NOACTIVE",
            createdAt: new Date(),
            updatedAt: new Date(),
            email,
            passwordHash: hashed,
        });
    }
    async login(body: UserLoginDtoOutput): Promise<UserSession> {
        const { email, password } = body;
        const user = await this.user.findByEmail(email);
        if (!user)
            throw new ValidationException<UserLoginDtoOutput>({
                fields: { email: ["form.email.notFound"] },
            });

        // fields: {
        //     email: ["form.email.notFound"],
        // },
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
        return this.sessionUser.create(user.id);
    }
    async forgotPassword(
        @Req() req: Request,
        body: UserForgotPasswordDtoOutput,
    ): Promise<Date> {
        const { email } = body;
        const user = await this.user.findByEmail(email);
        if (!user)
            throw new ValidationException<UserForgotPasswordDtoOutput>({
                fields: { email: ["form.email.notFound"] },
            });
        const resetTokenData = await this.resetToken.findByUserId(user.id);
        if (resetTokenData) {
            const isExpireToken = this.resetToken.isExpireToken(resetTokenData);
            if (!isExpireToken)
                throw new ValidationException<UserForgotPasswordDtoOutput>({
                    root: ["pages.forgotPasssword.feedback.errors.alreadySent"],
                });
            await this.resetToken.delete(resetTokenData.id);
        }
        const { token, id, expiresAt } = await this.resetToken.create(user.id);
        try {
            await this.mailerService.sendForgotPassword(req, {
                to: user.email,
                token,
            });
        } catch (error) {
            await this.resetToken.delete(id);
            throw error;
        }
        return expiresAt;
    }
    async changePassword(
        { password }: UserChangePasswordDtoOutput,
        { token, email }: { token: string; email: string },
    ): Promise<true> {
        const { id } = await this.resetToken.checkToken({
            email,
            token,
        });

        this.user.changePassword({ password, id });
        this.resetToken.deleteByUserId(id);
        return true;
    }
    async logout(sessionId: string): Promise<true> {
        return await this.sessionUser.delete(sessionId);
    }
}
