import { Public } from "@/modules/auth/decorators/public.decorator";
import { ResetPasswordTokenAdminService } from "@/modules/resetPasswordToken/admin/reset.password.token.admin.service";
import { ENDPOINT } from "@myorg/shared/endpoints";
import { Body, Controller, Post } from "@nestjs/common";

const { path, admin } = ENDPOINT.resetPasswordToken;

@Controller(path + "/" + admin.path)
export default class ResetPasswordTokenAdminController {
    constructor(private resetPassword: ResetPasswordTokenAdminService) {}
    @Post(admin.check.path)
    @Public()
    async check(
        @Body() body: { email?: string; token: string },
    ): Promise<true> {
        return await this.resetPassword.check(body);
    }
}
