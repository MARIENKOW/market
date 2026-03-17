// src/modules/auth/auth.module.ts
import { RouterModule } from "@nestjs/core";
import { ENDPOINT } from "@myorg/shared/endpoints";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthUserModule } from "@/modules/auth/user/auth.user.module";
import { AuthService } from "@/modules/auth/auth.service";
import { AuthAdminModule } from "@/modules/auth/admin/auth.admin.module";

@Module({
    imports: [AuthUserModule, AuthAdminModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}


export const AuthRegisterModule = RouterModule.register([
    {
        path: ENDPOINT.auth.path,
        module: AuthModule,

        children: [
            {
                path: ENDPOINT.auth.admin.path,
                module: AuthAdminModule,
            },
            {
                path: ENDPOINT.auth.user.path,
                module: AuthUserModule,
            },
        ],
    },
]);
