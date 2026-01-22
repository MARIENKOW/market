import { User } from '@/generated/prisma';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { SessionUserService } from '@/modules/session/user/session.user.service';
import { mapUser } from '@/modules/user/user.mapper';
import { UserDto } from '@myorg/shared/dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private sessionUser: SessionUserService,
  ) {}

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
  async findBySessionId(sessionId: string): Promise<User | null> {
    //! не тут решать статус код
    const SessionUserData = await this.sessionUser.findById(sessionId);
    if (!SessionUserData) throw new UnauthorizedException();

    const UserData = this.findById(SessionUserData.userId);

    if (!UserData) throw new UnauthorizedException();
    return UserData;
  }

  create(data: User): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
