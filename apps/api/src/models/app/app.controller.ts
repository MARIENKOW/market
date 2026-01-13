import { Controller, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import {
  UserSignInDtoInput,
  UserSignInSchema,
  UserSignUpDtoInput,
  UserSignUpSchema,
} from '@myorg/shared/form';
import { ZodValidationPipe } from '../../common/pipe/zod-validation';
import { UserService } from '@/models/user/user.service';
import { PrismaService } from '@/models/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('register')
  register(
    @Body(new ZodValidationPipe(UserSignUpSchema)) body: UserSignInDtoInput,
  ) {
    // return this.appService.getHello();
  }

  @Post('login')
  async login(
    @Body(new ZodValidationPipe(UserSignInSchema)) body: UserSignUpDtoInput,
    @Res({ passthrough: true }) res: Response,
  ) {

    console.log(this.prisma);
    return await this.prisma.user.create({
      data: { email: 'dasd@das.asd' },
    });
  }
}
