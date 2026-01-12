import { Controller, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import {
  UserSignInDtoInput,
  UserSignInSchema,
  UserSignUpDtoInput,
  UserSignUpSchema,
} from '@myorg/shared/form';
import { ZodValidationPipe } from './common/pipe/zod-validation';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  register(
    @Body(new ZodValidationPipe(UserSignUpSchema)) body: UserSignInDtoInput,
  ) {
    // return this.authService.register(body);
  }

  @Post('login')
  login(
    @Body(new ZodValidationPipe(UserSignInSchema)) body: UserSignUpDtoInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    // return this.authService.login(body, res);
  }
}
