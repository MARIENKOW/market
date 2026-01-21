// src/modules/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
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
import { AuthGuard } from '@/modules/auth/auth.guard';
import { Auth } from '@/modules/auth/auth.decorator';
import { ValidationException } from '@/common/exception/validation.exception';
import { getMessageKey } from '@myorg/shared/i18n';

const { register, login, logout } = ENDPOINT.auth.user;

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
    throw new ValidationException({
      email: 'sdasd',
    });
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
  async logout(@Body() { sessionId }: { sessionId: string }) {
    return this.authUser.logout(sessionId);
  }
}
