import { Controller, Get, Post, Delete, Body } from "@nestjs/common";
import { ChangePasswordUserService } from "./changePassword.user.service";
import { Auth, CurrentActor } from "@/modules/auth/decorators/auth.decorator";
import { UserActor } from "@/modules/auth/auth.type";
import {
    UserChangePasswordCodeDtoOutput,
    UserChangePasswordCodeSchema,
    UserChangePasswordDtoOutput,
    UserChangePasswordSchema,
    UserChangePasswordSettingsDtoOutput,
    UserChangePasswordSettingsSchema,
} from "@myorg/shared/form";
import { ENDPOINT, FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { ZodValidationPipe } from "@/common/pipe/zod-validation";

const { path } = FULL_PATH_ENDPOINT.user.changePassword;
const { status, confirm, resend, init, initWithoutPassword } =
    ENDPOINT.user.changePassword;

@Auth("USER")
@Controller(path)
export class ChangePasswordUserController {
    constructor(
        private readonly changePasswordService: ChangePasswordUserService,
    ) {}

    @Get(status.path)
    getStatus(@CurrentActor() actor: UserActor) {
        return this.changePasswordService.getStatus(actor.user.id);
    }

    @Post(init.path)
    initiate(
        @CurrentActor() actor: UserActor,
        @Body(new ZodValidationPipe(UserChangePasswordSettingsSchema))
        body: UserChangePasswordSettingsDtoOutput,
    ): Promise<{ email: string; time: number }> {
        return this.changePasswordService.initiate(actor.user.id, body);
    }

    @Post(initWithoutPassword.path)
    initiateWithoutPassword(
        @CurrentActor() actor: UserActor,
        @Body(new ZodValidationPipe(UserChangePasswordSchema))
        body: UserChangePasswordDtoOutput,
    ): Promise<{ email: string; time: number }> {
        return this.changePasswordService.initiateWithoutPassword(
            actor.user.id,
            body,
        );
    }

    @Post(confirm.path)
    confirm(
        @CurrentActor() actor: UserActor,
        @Body(new ZodValidationPipe(UserChangePasswordCodeSchema))
        body: UserChangePasswordCodeDtoOutput,
    ) {
        return this.changePasswordService.confirm(actor.user.id, body);
    }

    @Post(resend.path)
    resend(@CurrentActor() actor: UserActor) {
        return this.changePasswordService.resend(actor.user.id);
    }

    @Delete()
    cancel(@CurrentActor() actor: UserActor) {
        return this.changePasswordService.cancel(actor.user.id);
    }
}
