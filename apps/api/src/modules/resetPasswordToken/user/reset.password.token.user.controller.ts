import { ResetPasswordTokenUserService } from "@/modules/resetPasswordToken/user/reset.password.token.user.service";
import { ENDPOINT } from "@myorg/shared/endpoints";
import {
    Body,
    Controller,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    Post,
    UnauthorizedException,
} from "@nestjs/common";
import { NotFoundError } from "rxjs";

const { path, user } = ENDPOINT.resetPasswordToken;

@Controller(path + "/" + user.path)
export default class ResetPasswordTokenUserController {
    constructor(private resetPassword: ResetPasswordTokenUserService) {}
    @Post(user.check.path)
    async check(
        @Body() body: { email?: string; token: string },
    ): Promise<true> {
        await this.resetPassword.checkToken(body);
        return true;
    }
}
