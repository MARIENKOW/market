// src/modules/auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '@/modules/user/user.service';
import { getMessageKey } from '@myorg/shared/i18n';
import { UserLoginDtoOutput, UserRegisterDtoOutput } from '@myorg/shared/form';
import { SessionUserService } from '@/modules/session/user/session.user.service';
import { PrismaPromise, UserSession } from '@/generated/prisma';
import { ValidationException } from '@/common/exception/validation.exception';
@Injectable()
export class AuthUserService {
  constructor(
    private user: UserService,
    private sessionUser: SessionUserService,
  ) {}

  async register(body: UserRegisterDtoOutput) {
    const { password, email } = body;

    const emailUnique = await this.user.findByEmail(email);

    if (emailUnique)
      throw new BadRequestException({
        email: getMessageKey('form.email.unique'),
      });

    const hashed = await bcrypt.hash(password, 12);
    const user = await this.user.create({
      email,
      passwordHash: hashed,
    });
    return user;
  }

  async login(body: UserLoginDtoOutput): Promise<UserSession> {
    const { email, password } = body;
    const user = await this.user.findByEmail(email);
    if (!user)
      throw new ValidationException<UserLoginDtoOutput>({
        email: ['form.email.notFound'],
      });

    if (!user.passwordHash)
      throw new ValidationException<UserLoginDtoOutput>({
        'root.server': ['form.password.invalid'],
      });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)
      throw new ValidationException<UserLoginDtoOutput>({
        password: ['form.password.invalid'],
      });
    return this.sessionUser.create(user.id);
  }

  async logout(sessionId: string) {
    return this.sessionUser.delete(sessionId);
  }
}
