import { AppController } from '@/models/app/app.controller';
import { AppService } from '@/models/app/app.service';
import { PrismaModule } from '@/models/prisma/prisma.module';
import { PrismaService } from '@/models/prisma/prisma.service';
import { UserModule } from '@/models/user/user.module';
import { UserService } from '@/models/user/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
