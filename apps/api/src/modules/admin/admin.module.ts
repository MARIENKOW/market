import { AdminService } from "@/modules/admin/admin.service";
import { SessionAdminModule } from "@/modules/auth/admin/session/session.admin.module";
import { HashService } from "@/modules/hash/hash.service";
import { PrismaModule } from "@/modules/prisma/prisma.module";
import { AdminController } from "@/modules/admin/admin.controller";
import { Module } from "@nestjs/common";

@Module({
    imports: [PrismaModule, SessionAdminModule],
    providers: [AdminService, HashService],
    controllers: [AdminController],
    exports: [AdminService],
})
export class AdminModule {}
