import { Auth } from "@/modules/auth/auth.decorator";
import { AuthGuard } from "@/modules/auth/auth.guard";
import { mapAdmin } from "@/modules/admin/admin.mapper";
import { AdminService } from "@/modules/admin/admin.service";
import { AdminDto } from "@myorg/shared/dto";
import { ENDPOINT } from "@myorg/shared/endpoints";
import { Body, Controller, Get, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

const { path, me, theme, locale } = ENDPOINT.admin;

@Controller(path)
export class AdminController {
    constructor(private admin: AdminService) {}
    @Get(me.path)
    @Auth("admin")
    async me(@Req() req: Request): Promise<AdminDto> {
        return mapAdmin(req.actor.admin);
    }
    @Put(theme.path)
    @Auth("admin")
    async theme(
        @Req() req: Request,
        @Body() body: { theme: string },
    ): Promise<true> {
        return this.admin.changeTheme({
            id: req.actor.admin.id,
            theme: body.theme,
        });
    }
    @Put(locale.path)
    @Auth("admin")
    async locale(
        @Req() req: Request,
        @Body() body: { locale: string },
    ): Promise<true> {
        return this.admin.changeLocale({
            id: req.actor.admin.id,
            locale: body.locale,
        });
    }
}
