import { ENDPOINT } from '@myorg/shared/endpoints';
import { Controller, Get } from '@nestjs/common';

const { path, me } = ENDPOINT.user;

@Controller(path)
export class UserController {
  @Get(me.path)
  async getMe() {
    return 'dasdasd';
  }
}
