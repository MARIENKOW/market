import { Auth } from "@/modules/auth/auth.decorator";
import { AuthGuard } from "@/modules/auth/auth.guard";
import { mapUser } from "@/modules/user/user.mapper";
import { UserDto } from "@myorg/shared/dto";
import { ENDPOINT } from "@myorg/shared/endpoints";
import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

const { path, me } = ENDPOINT.user;

@Controller(path)
export class UserController {
    @Get(me.path)
    @UseGuards(AuthGuard)
    @Auth("user")
    async me(@Req() req: Request): Promise<UserDto> {
        console.log('useruseruseruseruseruseruseruser');
        return mapUser(req.actor.user);
        

    }
}
