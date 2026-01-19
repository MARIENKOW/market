// src/modules/auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/modules/prisma/prisma.service';
import crypto from 'crypto';
import { UserService } from '@/modules/user/user.service';
import { getMessageKey } from '@myorg/shared/i18n';
import { UserLoginDtoOutput, UserRegisterDtoOutput } from '@myorg/shared/form';
@Injectable()
export class AuthUserService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
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

  async login(body: UserLoginDtoOutput) {
    const { email, password } = body;
    const user = await this.user.findByEmail(email);
    if (!user)
      throw new BadRequestException({
        email: getMessageKey('form.email.notFound'),
      });

    if (!user.passwordHash)
      throw new BadRequestException({
        'root.server': getMessageKey('form.password.invalid'),
      });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)
      throw new BadRequestException({
        password: getMessageKey('form.password.invalid'),
      });

    return this.createSession(user.id);
  }

  async createSession(userId: string) {
    const id = crypto.randomBytes(32).toString('hex');

    const data = await this.prisma.userSession.create({
      data: { userId, id },
    });

    console.log(data);

    return id;
  }

  async logout(sessionId: string) {
    await this.prisma.userSession.delete({ where: { id: sessionId } });
  }
}
