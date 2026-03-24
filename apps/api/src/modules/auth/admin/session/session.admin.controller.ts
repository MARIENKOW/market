// src/modules/auth/auth.controller.ts
import { Controller, Get } from "@nestjs/common";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { Auth, CurrentActor } from "@/modules/auth/decorators/auth.decorator";

import { AdminActor } from "@/modules/auth/auth.type";
import { SessionAdminDto } from "@myorg/shared/dto";
import { SessionAdminService } from "@/modules/auth/admin/session/session.admin.service";

const { path } = FULL_PATH_ENDPOINT.auth.admin.session;

@Controller(path)
export class SessionAdminController {
    constructor(private session: SessionAdminService) {}

    @Get("")
    @Auth("ADMIN")
    async getMe(
        @CurrentActor()
        actor: AdminActor,
    ): Promise<SessionAdminDto[]> {
        return this.session.getMe(actor.admin);
    }
}
