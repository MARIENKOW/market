// // src/modules/auth/auth.guard.ts
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private auth: AuthService) {}

//   async canActivate(ctx: ExecutionContext) {
//     const req = ctx.switchToHttp().getRequest();
//     const sid = req.cookies?.sessionId;
//     if (!sid) return false;

//     const user = await this.auth.getUserBySession(sid);
//     if (!user) return false;

//     req.user = user;
//     return true;
//   }
// }
