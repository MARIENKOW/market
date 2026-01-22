// auth/auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AUTH_TYPE_KEY, Auth } from '@/modules/auth/auth.decorator';
import { AuthType } from '@/modules/auth/auth.actor.type';
import { SessionUserService } from '@/modules/session/user/session.user.service';
import { getMessageKey } from '@myorg/shared/i18n';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly sessionUser: SessionUserService,
    private readonly user: UserService,
    // private readonly sessionAdmin: SessionAdminService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const cookies = req.cookies ?? {};

    const allowedRoles: AuthType[] =
      this.reflector.get<AuthType[]>(AUTH_TYPE_KEY, ctx.getHandler()) ??
      this.reflector.get<AuthType[]>(AUTH_TYPE_KEY, ctx.getClass());

    if (!allowedRoles || allowedRoles.length === 0) {
      throw new ForbiddenException('Auth type not specified on route');
    }

    for (const role of allowedRoles) {
      if (role === 'user' && cookies.sessionId) {
        const session = await this.sessionUser.findById(cookies.sessionId);
        if (!session) continue;
        const user = await this.user.findById(session.userId);
        if (!user) continue;

        req.actor = { type: 'user', user: user, sessionId: session.id };
        await this.sessionUser.touch(session.id);
        return true;
      }
    }

    throw new ForbiddenException({
      root: {
        server: getMessageKey('api.FORBIDDEN'),
      },
    });
  }
}
