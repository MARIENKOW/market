import { User } from '@/generated/prisma';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  create(data: { email: string; passwordHash: string }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
