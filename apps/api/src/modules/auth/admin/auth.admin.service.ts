import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { AdminService } from "@/modules/admin/admin.service";
import {
    AdminChangePasswordDtoOutput,
    AdminForgotPasswordDtoOutput,
    AdminLoginDtoOutput,
} from "@myorg/shared/form";
import { ValidationException } from "@/common/exception/validation.exception";
import { ResetPasswordTokenAdminService } from "@/modules/resetPasswordToken/admin/reset.password.token.admin.service";
import { i18nFormatDuration } from "@/helpers/i18n.formatDuration";
import { MessageStructure } from "@myorg/shared/i18n";
import { I18nService } from "nestjs-i18n";
import { HashService } from "@/modules/hash/hash.service";
import { RequestContextService } from "@/common/request-context/request-context.service";
import { OAuth2Client } from "google-auth-library";
import { SessionAdminService } from "@/modules/auth/admin/session/session.admin.service";
@Injectable()
export class AuthAdminService {
    constructor(
        private admin: AdminService,
        private session: SessionAdminService,
        private resetToken: ResetPasswordTokenAdminService,
        private i18n: I18nService<MessageStructure>,
        private hash: HashService,
        private context: RequestContextService,
        private oauthClient: OAuth2Client,
    ) {
        this.oauthClient = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
        );
    }

    async refresh(
        refreshTokenAdmin: string,
    ): Promise<{ accessTokenAdmin: string; refreshTokenAdmin: string }> {
        const { accessToken, refreshToken } =
            await this.session.refresh(refreshTokenAdmin);

        return {
            accessTokenAdmin: accessToken,
            refreshTokenAdmin: refreshToken,
        };
    }
    async google({
        code,
    }: {
        code: string;
    }): Promise<{ accessToken: string; refreshToken: string }> {
        const { tokens } = await this.oauthClient.getToken({
            code,
            redirect_uri: "postmessage",
        });

        if (!tokens.id_token) throw new InternalServerErrorException();

        const ticket = await this.oauthClient.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload?.email) {
            throw new InternalServerErrorException();
        }

        const { email, name, picture } = payload;

        let admin = await this.admin.findByEmail(email);

        if (!admin) throw new UnauthorizedException();

        const sessionData = await this.session.create({
            adminId: admin.id,
        });
        return sessionData;
    }
    async login(
        body: AdminLoginDtoOutput,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const { email, password } = body;
        const admin = await this.admin.findByEmail(email);
        if (!admin)
            throw new ValidationException<AdminLoginDtoOutput>({
                fields: { email: ["form.email.notFound"] },
            });

        if (!admin.passwordHash)
            throw new ValidationException<AdminLoginDtoOutput>({
                root: [
                    {
                        message: this.i18n.t(
                            "pages.login.feedback.errors.passwordNotFound",
                            {
                                args: {
                                    btn: this.i18n.t(
                                        "pages.forgotPassword.name",
                                    ),
                                },
                            },
                        ),
                        type: "error",
                    },
                ],
            });
        const valid = await this.hash.compare(password, admin.passwordHash);

        if (!valid)
            throw new ValidationException<AdminLoginDtoOutput>({
                fields: {
                    password: ["form.password.invalid"],
                },
            });
        //!--- Admin staatus blocked

        const sessionData = await this.session.create({
            adminId: admin.id,
        });
        return sessionData;
    }

    async forgotPassword({
        email,
    }: AdminForgotPasswordDtoOutput): Promise<string> {
        const admin = await this.admin.findByEmail(email);
        if (!admin)
            throw new ValidationException<AdminForgotPasswordDtoOutput>({
                fields: { email: ["form.email.notFound"] },
            });

        const resetTokenData = await this.resetToken.isHaveAdminToken(admin);
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
        const expires = await this.resetToken.createAndSend(admin, origin);
        return this.i18n.t("pages.forgotPassword.feedback.success", {
            args: {
                time: i18nFormatDuration(expires),
            },
        });
    }
    async changePassword(
        { password }: AdminChangePasswordDtoOutput,
        { token }: { token: string },
    ): Promise<true> {
        let payload;
        try {
            payload = this.resetToken.verifyToken(decodeURIComponent(token));
        } catch (error) {
            throw new NotFoundException();
        }
        const adminData = await this.admin.findById(payload.adminId);
        if (!adminData) throw new NotFoundException();
        const resetPasswordToken = await this.resetToken.findByAdminId(
            adminData.id,
        );
        if (!resetPasswordToken) throw new NotFoundException();
        const isValid = this.hash.verifySha256(
            token,
            resetPasswordToken.tokenHash,
        );
        if (!isValid) throw new NotFoundException();

        if (this.resetToken.isExpireToken(resetPasswordToken)) {
            console.log("object");
            throw new ValidationException({
                root: [
                    {
                        message: this.i18n.t(
                            "pages.forgotPassword.changePassword.feedback.errors.timeout",
                        ),
                        type: "error",
                        data: { isShowButton: true },
                    },
                ],
            });
        }

        await this.admin.changePassword({ password, id: adminData.id });
        await this.resetToken.deleteByAdminId(adminData.id);
        await this.session.deleteAllByAdminId(adminData.id);
        return true;
    }
    async logout(sessionId: string): Promise<true> {
        return await this.session.delete(sessionId);
    }
}
