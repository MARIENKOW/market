import { RequestContextService } from "@/common/request-context/request-context.service";
import { AuthGuard } from "@/modules/auth/auth.guard";
import { SessionUserModule } from "@/modules/auth/user/session/session.user.module";

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
