import { AppController } from '@/modules/app/app.controller';
import { AppService } from '@/modules/app/app.service';
import { AuthModule, AuthRegisterModule } from '@/modules/auth/auth.module';
import { CoreModule } from '@/modules/core/core.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthRegisterModule, AuthModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
