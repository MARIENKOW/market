// src/modules/auth/auth.controller.ts
import { Controller, Get } from "@nestjs/common";
import { FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { Auth, CurrentActor } from "@/modules/auth/decorators/auth.decorator";

import { UserActor } from "@/modules/auth/auth.type";
import { SessionUserService } from "@/modules/auth/user/session/session.user.service";
import { SessionUserDto, SessionUserViewDto } from "@myorg/shared/dto";

const { path } = FULL_PATH_ENDPOINT.auth.user.session;

@Controller(path)
export class SessionUserController {
    constructor(private session: SessionUserService) {}

    @Get("")
    @Auth("USER")
    async getMe(
        @CurrentActor()
        actor: UserActor,
    ): Promise<SessionUserViewDto[]> {
        return this.session.getMe(actor.user, actor.sessionId);
    }
}
