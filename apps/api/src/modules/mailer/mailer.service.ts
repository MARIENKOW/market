// src/mailer/mailer.service.ts
import {
    Injectable,
    Logger,
    NestModule,
    OnModuleInit,
    Req,
} from "@nestjs/common";
import nodemailer, { Transporter } from "nodemailer";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
// import { I18nService } from "@/lib/i18n/i18n.service";
import { Request } from "express";
import { defaultLanguage, getMessageKey } from "@myorg/shared/i18n";
import { I18nContext, I18nService } from "nestjs-i18n";

export interface SendForgotPasswordOptions {
    to: string;
    token: string;
    name?: string;
}

@Injectable()
export class MailerService implements OnModuleInit {
    private transporter!: nodemailer.Transporter; // ← Вот так
    private readonly logger = new Logger(MailerService.name);

    constructor(private i18n: I18nService) {}

    onModuleInit() {
        this.transporter = nodemailer.createTransport({
            // debug: true,
            // logger: true,
            secure: true,
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT ? +process.env.SMTP_PORT : 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            pool: true,

            maxConnections: 5,
            maxMessages: 100,
            // Rate limit
            rateDelta: 1000 * 60, // 1 min
            rateLimit: 10,
        });
        this.transporter.verify().then(
            () => this.logger.log("SMTP ready"),
            (data) => {
                this.logger.error(data);
            },
        );
    }

    async sendForgotPassword(
        @Req() req: Request,
        { to, token, name }: SendForgotPasswordOptions,
    ) {
        const resetUrl = `${process.env.CLIENT_API}${FULL_PATH_ROUTE.forgotPasssword.path}/${token}?email=${to}`;
        const locale = "en";
        // const locale = this.i18n.getLocale(req.cookies?.["NEXT_LOCALE"]);
        console.log(this.i18n.t(getMessageKey("api.ERR_NETWORK")));

        const html = `
            <!DOCTYPE html lang="${locale}">
            <html>
            <head><meta charset="UTF-8"></head>
            <body style="font-family: Arial;">
            <h2>Сброс пароля</h2>
            <p><a href="${resetUrl}" style="background:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Скинути пароль</a></p>
            <hr>
            <p>Посилання діє 1 годину.</p>
            </body>
            </html>`;
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Сброс пароля",
            html,
            text: `Скинь пароль: ${resetUrl}`,
        });
    }
}
