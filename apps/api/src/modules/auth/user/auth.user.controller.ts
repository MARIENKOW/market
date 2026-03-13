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
import { AuthUserService } from "@/modules/auth/user/auth.user.service";
import { ENDPOINT } from "@myorg/shared/endpoints";
import {
    UserChangePasswordDtoOutput,
    UserChangePasswordSchema,
    UserForgotPasswordDtoOutput,
    UserForgotPasswordSchema,
    UserLoginDtoOutput,
    UserLoginSchema,
    UserRegisterDtoOutput,
    UserRegisterSchema,
} from "@myorg/shared/form";
import { ZodValidationPipe } from "@/common/pipe/zod-validation";
import { CookieOptions, Request, Response } from "express";
import { AuthGuard } from "@/modules/auth/auth.guard";
import { Auth } from "@/modules/auth/auth.decorator";

export const COOKIE_CONFIG: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    path: "/",
};

const { register, login, logout, forgotPassword, refresh, activate } =
    ENDPOINT.auth.user;

@Controller()
export class AuthUserController {
    constructor(private authUser: AuthUserService) {}

    @Post(register.path)
    async register(
        @Body(new ZodValidationPipe(UserRegisterSchema))
        body: UserRegisterDtoOutput,
    ): Promise<string> {
        return this.authUser.register(body);
    }
    @Get(refresh.path)
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<true> {
        const accessToken = req.cookies["accessTokenUser"];
        if (!accessToken) throw new UnauthorizedException();
        const refreshToken = req.cookies["refreshTokenUser"];
        if (!refreshToken) throw new UnauthorizedException();
        const { accessTokenUser, refreshTokenUser } =
            await this.authUser.refresh(refreshToken);
        res.cookie("accessTokenUser", accessTokenUser, COOKIE_CONFIG);
        res.cookie("refreshTokenUser", refreshTokenUser, COOKIE_CONFIG);
        return true;
    }

    @Post(login.path)
    async login(
        @Body(new ZodValidationPipe(UserLoginSchema)) body: UserLoginDtoOutput,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<true> {
        const { accessToken, refreshToken } = await this.authUser.login(body, {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
        });
        res.cookie("accessTokenUser", accessToken, COOKIE_CONFIG);
        res.cookie("refreshTokenUser", refreshToken, COOKIE_CONFIG);
        return true;
    }

    @Post(forgotPassword.path)
    async forgotPassword(
        @Body(new ZodValidationPipe(UserForgotPasswordSchema))
        body: UserForgotPasswordDtoOutput,
    ): Promise<string> {
        return await this.authUser.forgotPassword(body);
    }

    @Post(forgotPassword.path + "/:token")
    async changePassword(
        @Body(new ZodValidationPipe(UserChangePasswordSchema))
        body: UserChangePasswordDtoOutput,
        @Param("token") token: string,
        @Query("email") email: string,
    ): Promise<true> {
        return await this.authUser.changePassword(body, { email, token });
    }

    @Post(activate.path)
    async activate(
        @Body() body: { email?: string; token: string },
    ): Promise<true> {
        return await this.authUser.activate(body);
    }
    @Post(activate.path + "/" + activate.send.path)
    async sendActivate(@Body() body: { email?: string }): Promise<string> {
        return await this.authUser.sendActivate(body);
    }

    @Post(logout.path)
    @UseGuards(AuthGuard)
    @Auth("user")
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<true> {
        await this.authUser.logout(req.actor.sessionId);
        res.cookie("accessTokenUser", "", COOKIE_CONFIG);
        res.cookie("refreshTokenUser", "", COOKIE_CONFIG);
        return true;
    }
}
