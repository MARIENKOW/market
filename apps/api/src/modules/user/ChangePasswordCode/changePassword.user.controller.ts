import { Controller, Get, Post, Delete, Body, Res } from "@nestjs/common";
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
import {
    ChangePasswordStatus,
    ChangePasswordUserService,
    MailSendSuccess,
} from "@/modules/user/ChangePasswordCode/changePassword.user.service";
import { Response } from "express";
import { COOKIE_CONFIG } from "@/modules/auth/user/auth.user.controller";

const { path } = FULL_PATH_ENDPOINT.user.changePassword;
const { status, confirm, resend, init, initWithoutPassword, cancel } =
    ENDPOINT.user.changePassword;

@Auth("USER")
@Controller(path)
export class ChangePasswordUserController {
    constructor(
        private readonly changePasswordService: ChangePasswordUserService,
    ) {}

    @Get(status.path)
    getStatus(@CurrentActor() actor: UserActor): Promise<ChangePasswordStatus> {
        return this.changePasswordService.getStatus(actor.user);
    }

    @Post(init.path)
    initiate(
        @CurrentActor() actor: UserActor,
        @Body(new ZodValidationPipe(UserChangePasswordSettingsSchema))
        body: UserChangePasswordSettingsDtoOutput,
    ): Promise<MailSendSuccess> {
        return this.changePasswordService.initiate(actor.user, body);
    }

    @Post(initWithoutPassword.path)
    initiateWithoutPassword(
        @CurrentActor() actor: UserActor,
        @Body(new ZodValidationPipe(UserChangePasswordSchema))
        body: UserChangePasswordDtoOutput,
    ): Promise<MailSendSuccess> {
        return this.changePasswordService.initiateWithoutPassword(
            actor.user,
            body,
        );
    }

    @Post(confirm.path)
    async confirm(
        @CurrentActor() actor: UserActor,
        @Body(new ZodValidationPipe(UserChangePasswordCodeSchema))
        body: UserChangePasswordCodeDtoOutput,
        @Res({ passthrough: true }) res: Response,
    ): Promise<void> {
        await this.changePasswordService.confirm(actor.user.id, body);
        res.cookie("accessTokenUser", "", COOKIE_CONFIG);
        res.cookie("refreshTokenUser", "", COOKIE_CONFIG);
    }

    @Post(resend.path)
    resend(@CurrentActor() actor: UserActor): Promise<MailSendSuccess> {
        return this.changePasswordService.resend(actor.user);
    }

    @Delete(cancel.path)
    cancel(@CurrentActor() actor: UserActor): Promise<void> {
        return this.changePasswordService.cancel(actor.user.id);
    }
}
