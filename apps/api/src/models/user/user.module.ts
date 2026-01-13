import { PrismaModule } from '@/models/prisma/prisma.module';
import { UserService } from '@/models/user/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
})
export class UserModule {}
