// src/modules/auth/auth.controller.ts
import {
    Controller,
    Post,
    Body,
    Res,
    UseGuards,
    Req,
    Param,
    Query,
    Get,
    UnauthorizedException,
} from "@nestjs/common";
import { ENDPOINT } from "@myorg/shared/endpoints";
import {
    AdminChangePasswordDtoOutput,
    AdminChangePasswordSchema,
    AdminForgotPasswordDtoOutput,
    AdminForgotPasswordSchema,
    AdminLoginDtoOutput,
    AdminLoginSchema,
} from "@myorg/shared/form";
import { ZodValidationPipe } from "@/common/pipe/zod-validation";
import { CookieOptions, Request, Response } from "express";
import { AuthGuard } from "@/modules/auth/auth.guard";
import { Auth } from "@/modules/auth/auth.decorator";
import { env } from "@/config";
import { AuthAdminService } from "@/modules/auth/admin/auth.admin.service";

export const COOKIE_CONFIG: CookieOptions = {
    httpOnly: true,
    secure: env.HTTPS,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    path: "/",
};

const { login, logout, forgotPassword, refresh, google } = ENDPOINT.auth.admin;

@Controller()
export class AuthAdminController {
    constructor(private authAdmin: AuthAdminService) {}

    @Get(refresh.path)
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<true> {
        const accessToken = req.cookies["accessTokenAdmin"];
        if (!accessToken) throw new UnauthorizedException();
        const refreshToken = req.cookies["refreshTokenAdmin"];
        if (!refreshToken) throw new UnauthorizedException();
        const { accessTokenAdmin, refreshTokenAdmin } =
            await this.authAdmin.refresh(refreshToken);
        res.cookie("accessTokenAdmin", accessTokenAdmin, COOKIE_CONFIG);
        res.cookie("refreshTokenAdmin", refreshTokenAdmin, COOKIE_CONFIG);
        return true;
    }

    @Post(login.path)
    async login(
        @Body(new ZodValidationPipe(AdminLoginSchema))
        body: AdminLoginDtoOutput,
        @Res({ passthrough: true }) res: Response,
    ): Promise<true> {
        const { accessToken, refreshToken } = await this.authAdmin.login(body);
        res.cookie("accessTokenAdmin", accessToken, COOKIE_CONFIG);
        res.cookie("refreshTokenAdmin", refreshToken, COOKIE_CONFIG);
        return true;
    }
    @Post(google.path)
    async google(
        @Body() body: { code: string },
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<true> {
        const { accessToken, refreshToken } = await this.authAdmin.google(body);
        console.log(accessToken, refreshToken);
        res.cookie("accessTokenAdmin", accessToken, COOKIE_CONFIG);
        res.cookie("refreshTokenAdmin", refreshToken, COOKIE_CONFIG);
        return true;
    }

    @Post(forgotPassword.path)
    async forgotPassword(
        @Body(new ZodValidationPipe(AdminForgotPasswordSchema))
        body: AdminForgotPasswordDtoOutput,
    ): Promise<string> {
        return await this.authAdmin.forgotPassword(body);
    }

    @Post(forgotPassword.path + "/:token")
    async changePassword(
        @Body(new ZodValidationPipe(AdminChangePasswordSchema))
        body: AdminChangePasswordDtoOutput,
        @Param("token") token: string,
    ): Promise<true> {
        return await this.authAdmin.changePassword(body, { token });
    }

    @Post(logout.path)
    @UseGuards(AuthGuard)
    @Auth("admin")
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<true> {
        await this.authAdmin.logout(req.actor.sessionId);
        res.cookie("accessTokenAdmin", "", COOKIE_CONFIG);
        res.cookie("refreshTokenAdmin", "", COOKIE_CONFIG);
        return true;
    }
}
