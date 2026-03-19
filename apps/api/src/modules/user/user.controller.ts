import { Auth, CurrentActor } from "@/modules/auth/decorators/auth.decorator";
import { mapUser } from "@/modules/user/user.mapper";
import { UserService } from "@/modules/user/user.service";
import { UserDto } from "@myorg/shared/dto";
import { ENDPOINT } from "@myorg/shared/endpoints";
import {
    Body,
    Controller,
    Get,
    Put,
    Req,
    UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { isUserActor, UserActor } from "@/modules/auth/auth.type";

const { path, me, theme, locale } = ENDPOINT.user;

@Controller(path)
export class UserController {
    constructor(private user: UserService) {}
    @Get(me.path)
    @Auth("USER")
    async me(@CurrentActor() actor: UserActor): Promise<UserDto> {
        return mapUser(actor.user);
    }
    @Put(theme.path)
    @Auth("USER")
    async theme(
        @CurrentActor() actor: UserActor,
        @Body() body: { theme: string },
    ): Promise<true> {
        return this.user.changeTheme({
            id: actor.user.id,
            theme: body.theme,
        });
    }
    @Put(locale.path)
    @Auth("USER")
    async locale(
        @Req() req: Request,
        @Body() body: { locale: string },
    ): Promise<true> {
        if (!req.actor || !isUserActor(req.actor))
            throw new UnauthorizedException();
        return this.user.changeLocale({
            id: req.actor.user.id,
            locale: body.locale,
        });
    }
}
