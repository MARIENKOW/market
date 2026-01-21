import { Prisma, UserSession } from '@/generated/prisma';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class SessionUserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<any> {
    return this.prisma.userSession.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }
  async touch(id: string): Promise<any> {
    return this.prisma.userSession.update({
      where: { id },
      data: { lastUsedAt: new Date() },
    });
  }
  async create(userId: string): Promise<UserSession> {
    const id = crypto.randomBytes(32).toString('hex');

    const data = await this.prisma.userSession.create({
      data: { userId, id },
    });

    return data;
  }
  async delete(sessionId: string): Promise<any> {
    return this.prisma.userSession.delete({ where: { id: sessionId } });
  }
}
