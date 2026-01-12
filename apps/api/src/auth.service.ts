import { UserSignInDtoInput, UserSignUpDtoInput } from '@myorg/shared/form';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user.service';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(data: UserSignUpDtoInput) {
    // const hash = await .hash(data.password, 10);

    return this.userService.create({
      email: data.email,
      passwordHash: 'hash',
    });
  }

  async login(data: UserSignInDtoInput, res: Response) {
    const user = await this.userService.findByEmail(data.email);
    // password check
    // issue tokens
  }
}
