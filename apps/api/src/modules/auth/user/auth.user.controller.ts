// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
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
import { UserDto } from '@myorg/shared/dto';

const { register, login, logout } = ENDPOINT.auth.user;

@Controller()
export class AuthUserController {
  constructor(private authUser: AuthUserService) {}

  @Post(register.path)
  async register(
    @Body(new ZodValidationPipe(UserRegisterSchema))
    body: UserRegisterDtoOutput,
  ): Promise<UserDto> {
    return this.authUser.register(body);
  }

  @Post(login.path)
  async login(
    @Body(new ZodValidationPipe(UserLoginSchema)) body: UserLoginDtoOutput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<true> {
    const { id } = await this.authUser.login(body);
    res.cookie('sessionId', id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней для refresh
      path: '/',
    });
    return true;
  }

  @Post(logout.path)
  async logout(
    @Body() { sessionId }: { sessionId: string },
    @Res() res: Response,
  ): Promise<true> {
    this.authUser.logout(sessionId);

    res.cookie('sessionId', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    return true;
  }
}
