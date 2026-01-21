// auth/auth.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Actor } from '@/modules/auth/auth.actor.type';
import { AuthType } from '@/modules/auth/auth.actor.type';

export const AUTH_TYPE_KEY = 'auth_type';

export const Auth = (...types: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, types);

export const ActorParam = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Actor => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.actor) {
      throw new Error(
        'Actor is not set. Did you forget @UseGuards(AuthGuard)?',
      );
    }
    return req.actor;
  },
);
