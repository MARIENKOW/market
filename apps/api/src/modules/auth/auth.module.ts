// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthUserModule } from '@/modules/auth/user/auth.user.module';

@Module({
  imports: [AuthUserModule],
  providers: [],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}

import { RouterModule } from '@nestjs/core';
import { ENDPOINT } from '@myorg/shared/endpoints';

export const AuthRegisterModule = RouterModule.register([
  {
    path: ENDPOINT.auth.path,
    module: AuthModule,
    children: [
      {
        path: ENDPOINT.auth.user.path,
        module: AuthUserModule,
      },
    ],
  },
]);
