import { ValidationException } from "@/common/exception/validation.exception";
import { ResetPassswordTokenUserService } from "@/modules/resetPasswordToken/user/reset.password.token.user.service";
import { ENDPOINT } from "@myorg/shared/endpoints";
import {
    Body,
    Controller,
    ForbiddenException,
    Param,
    Post,
    UnauthorizedException,
} from "@nestjs/common";

const { path, user } = ENDPOINT.resetPasswordToken;

@Controller(path + "/" + user.path)
export default class ResetPasswordTokenUserController {
    constructor(private resetPassword: ResetPassswordTokenUserService) {}
    @Post(user.check.path)
    async check(
        @Body() body: { email?: string; token: string },
    ): Promise<true> {
        await this.resetPassword.checkToken(body);
        return true;
    }
}
