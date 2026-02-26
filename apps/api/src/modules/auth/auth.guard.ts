// auth/auth.guard.ts
import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { AUTH_TYPE_KEY } from "@/modules/auth/auth.decorator";
import { AuthType } from "@/modules/auth/auth.actor.type";
import {
    AccessTokenUserPayload,
    SessionUserService,
} from "@/modules/session/user/session.user.service";
import { UserService } from "@/modules/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly sessionUser: SessionUserService,
        private readonly user: UserService,
    ) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest<Request>();
        const cookies = req.cookies ?? {};

        const allowedRoles: AuthType[] =
            this.reflector.get<AuthType[]>(AUTH_TYPE_KEY, ctx.getHandler()) ??
            this.reflector.get<AuthType[]>(AUTH_TYPE_KEY, ctx.getClass());

        if (!allowedRoles || allowedRoles.length === 0) {
            throw new ForbiddenException();
        }

        // for (const role of allowedRoles) {
        // if (role === "user" && cookies.sessionId) {

        if (allowedRoles.includes("user")) {
            if (!cookies.accessTokenUser) throw new UnauthorizedException();
            let plaload: AccessTokenUserPayload;
            try {
                plaload = this.sessionUser.verifyAccessToken(
                    cookies.accessTokenUser,
                );
            } catch (error) {
                throw new UnauthorizedException();
            }

            const session = await this.sessionUser.findById(plaload.sessionId);
            // if (!session) continue;
            if (!session) throw new UnauthorizedException();
            const user = await this.user.findById(session.userId);
            // if (!user) continue;
            if (!user) throw new UnauthorizedException();
            if (user.status !== "ACTIVE") throw new UnauthorizedException();

            req.actor = { type: "user", user: user, sessionId: session.id };
            await this.sessionUser.touch(session.id);
            return true;
        }
        // }

        throw new ForbiddenException();
    }
}
