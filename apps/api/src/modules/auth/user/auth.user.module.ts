// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserController } from '@/modules/auth/user/auth.user.controller';
import { AuthUserService } from '@/modules/auth/user/auth.user.service';
import { UserService } from '@/modules/user/user.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthUserService, UserService],
  controllers: [AuthUserController],
  exports: [AuthUserService],
})
export class AuthUserModule {}
