// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { AuthUserService } from '@/modules/auth/user/auth.user.service';
import { ENDPOINT } from '@myorg/shared/endpoints';
import {
  UserLoginDtoOutput,
  UserLoginSchema,
  UserRegisterDtoOutput,
  UserRegisterSchema,
} from '@myorg/shared/form';
import { ZodValidationPipe } from '@/common/pipe/zod-validation';
import { Response } from 'express';

const { path, register, login, logout } = ENDPOINT.auth.user;

console.log(path);

@Controller()
export class AuthUserController {
  constructor(private authUser: AuthUserService) {}

  @Post(register.path)
  async register(
    @Body(new ZodValidationPipe(UserRegisterSchema))
    body: UserRegisterDtoOutput,
  ) {
    return this.authUser.register(body);
  }

  @Post(login.path)
  async login(
    @Body(new ZodValidationPipe(UserLoginSchema)) body: UserLoginDtoOutput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const sessionId = await this.authUser.login(body);
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 7 дней для refresh
      path: '/',
    });
    return true;
  }

  @Post(logout.path)
  async logout(@Body() { sessionId }: { sessionId: string }) {
    return this.authUser.logout(sessionId);
  }
}
