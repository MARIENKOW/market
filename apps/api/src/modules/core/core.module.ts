import { AuthGuard } from "@/modules/auth/auth.guard";

import { SessionUserModule } from "@/modules/session/user/session.user.module";
import { UserModule } from "@/modules/user/user.module";
import { Global, Module } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Global()
@Module({
    imports: [SessionUserModule, UserModule],
    providers: [AuthGuard, Reflector],
    exports: [AuthGuard],
})
export class CoreModule {}
