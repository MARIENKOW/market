import { Auth } from "@/modules/auth/auth.decorator";
import { AuthGuard } from "@/modules/auth/auth.guard";
import { mapUser } from "@/modules/user/user.mapper";
import { UserService } from "@/modules/user/user.service";
import { UserDto } from "@myorg/shared/dto";
import { ENDPOINT } from "@myorg/shared/endpoints";
import { Body, Controller, Get, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

const { path, me, theme, locale } = ENDPOINT.user;

@Controller(path)
export class UserController {
    constructor(private user: UserService) {}
    @Get(me.path)
    @UseGuards(AuthGuard)
    @Auth("user")
    async me(@Req() req: Request): Promise<UserDto> {
        return mapUser(req.actor.user);
    }
    @Put(theme.path)
    @UseGuards(AuthGuard)
    @Auth("user")
    async theme(
        @Req() req: Request,
        @Body() body: { theme: string },
    ): Promise<true> {
        return this.user.changeTheme({
            id: req.actor.user.id,
            theme: body.theme,
        });
    }
    @Put(locale.path)
    @UseGuards(AuthGuard)
    @Auth("user")
    async locale(
        @Req() req: Request,
        @Body() body: { locale: string },
    ): Promise<true> {
        return this.user.changeLocale({
            id: req.actor.user.id,
            locale: body.locale,
        });
    }
}
