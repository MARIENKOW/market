import { PrismaModule } from '@/modules/prisma/prisma.module';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers:[UserController],
  exports:[UserService]
})
export class UserModule {}
