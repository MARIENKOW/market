import { Auth, CurrentActor } from "@/modules/auth/decorators/auth.decorator";
import { mapAdmin } from "@/modules/admin/admin.mapper";
import { AdminService } from "@/modules/admin/admin.service";
import { AdminDto } from "@myorg/shared/dto";
import { ENDPOINT, FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { Body, Controller, Get, Put, Req } from "@nestjs/common";
import { Request } from "express";
import { AdminActor } from "@/modules/auth/auth.type";

const { me, theme, locale } = ENDPOINT.admin;
const { path } = FULL_PATH_ENDPOINT.admin;

@Controller(path)
export class AdminController {
    constructor(private admin: AdminService) {}
    @Get(me.path)
    @Auth("ADMIN")
    async me(@CurrentActor() actor: AdminActor): Promise<AdminDto> {
        return mapAdmin(actor.admin);
    }
    @Put(theme.path)
    @Auth("ADMIN")
    async theme(
        @Req() req: Request,
        @CurrentActor() actor: AdminActor,
        @Body() body: { theme: string },
    ): Promise<true> {
        return this.admin.changeTheme({
            id: actor.admin.id,
            theme: body.theme,
        });
    }
    @Put(locale.path)
    @Auth("ADMIN")
    async locale(
        @CurrentActor() actor: AdminActor,
        @Body() body: { locale: string },
    ): Promise<true> {
        return this.admin.changeLocale({
            id: actor.admin.id,
            locale: body.locale,
        });
    }
}
