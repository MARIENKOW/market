import { Module } from "@nestjs/common";
import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { MailerModule } from "@/infrastructure/mailer/mailer.module";
import { AdminInvitationController } from "@/modules/admin/invitation/adminInvitation.controller";
import { AdminInvitationService } from "@/modules/admin/invitation/adminInvitation.service";
import { RequestContextModule } from "@/common/request-context/request-context.module";

@Module({
    imports: [PrismaModule, MailerModule, RequestContextModule],
    controllers: [AdminInvitationController],
    providers: [AdminInvitationService],
})
export class AdminInvitationModule {}
