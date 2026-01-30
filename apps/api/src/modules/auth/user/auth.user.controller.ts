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
import { Response } from "express";
import { UserDto } from "@myorg/shared/dto";
import { AuthGuard } from "@/modules/auth/auth.guard";
import { Auth } from "@/modules/auth/auth.decorator";
import { Request } from "express";

const { register, login, logout, forgotPassword, changePassword } =
    ENDPOINT.auth.user;
@Controller()
export class AuthUserController {
    constructor(private authUser: AuthUserService) {}

    @Post(register.path)
    async register(
        @Body(new ZodValidationPipe(UserRegisterSchema))
        body: UserRegisterDtoOutput,
    ): Promise<UserDto> {
        return this.authUser.register(body);
    }

    @Post(login.path)
    async login(
        @Body(new ZodValidationPipe(UserLoginSchema)) body: UserLoginDtoOutput,
        @Res({ passthrough: true }) res: Response,
    ): Promise<true> {
        const { id } = await this.authUser.login(body);
        res.cookie("sessionId", id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней для refresh
            path: "/",
        });
        return true;
    }

    @Post(forgotPassword.path)
    async forgotPassword(
        @Body(new ZodValidationPipe(UserForgotPasswordSchema))
        body: UserForgotPasswordDtoOutput,
    ): Promise<Date> {
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

    @Post(logout.path)
    @UseGuards(AuthGuard)
    @Auth("user")
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<true> {
        await this.authUser.logout(req.actor.sessionId);

        res.cookie("sessionId", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
        });
        return true;
    }
}
