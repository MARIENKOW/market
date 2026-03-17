import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { AUTH_TYPE_KEY } from "@/modules/auth/auth.decorator";
import { IS_PUBLIC_KEY } from "@/modules/auth/public.decorator";
import { AuthType } from "@/modules/auth/auth.actor.type";
import { UserService } from "@/modules/user/user.service";
import {
    SessionUserService,
    AccessTokenUserPayload,
} from "@/modules/auth/user/session/session.user.service";
import { AdminService } from "@/modules/admin/admin.service";
import {
    SessionAdminService,
    AccessTokenAdminPayload,
} from "@/modules/auth/admin/session/session.admin.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly sessionUser: SessionUserService,
        private readonly user: UserService,
        private readonly sessionAdmin: SessionAdminService,
        private readonly admin: AdminService,
    ) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [ctx.getHandler(), ctx.getClass()],
        );
        if (isPublic) return true;

        const allowedRoles = this.reflector.getAllAndOverride<AuthType[]>(
            AUTH_TYPE_KEY,
            [ctx.getHandler(), ctx.getClass()],
        );
        if (!allowedRoles?.length) throw new UnauthorizedException();

        const req = ctx.switchToHttp().getRequest<Request>();
        const cookies = req.cookies ?? {};

        if (allowedRoles.includes("user")) {
            return this.authenticateUser(req, cookies);
        }

        if (allowedRoles.includes("admin")) {
            return this.authenticateAdmin(req, cookies);
        }

        throw new UnauthorizedException();
    }

    private async authenticateUser(
        req: Request,
        cookies: Record<string, string>,
    ): Promise<boolean> {
        if (!cookies.accessTokenUser) throw new UnauthorizedException();

        let payload: AccessTokenUserPayload;
        try {
            payload = this.sessionUser.verifyAccessToken(
                cookies.accessTokenUser,
            );
        } catch {
            throw new UnauthorizedException();
        }

        const session = await this.sessionUser.findById(payload.sessionId);
        if (!session) throw new UnauthorizedException();

        const user = await this.user.findById(session.userId);
        if (!user || user.status !== "ACTIVE")
            throw new UnauthorizedException();

        req.actor = { type: "user", user, sessionId: session.id };
        await this.sessionUser.touch(session.id);
        return true;
    }

    private async authenticateAdmin(
        req: Request,
        cookies: Record<string, string>,
    ): Promise<boolean> {
        if (!cookies.accessTokenAdmin) throw new UnauthorizedException();

        let payload: AccessTokenAdminPayload;
        try {
            payload = this.sessionAdmin.verifyAccessToken(
                cookies.accessTokenAdmin,
            );
        } catch {
            throw new UnauthorizedException();
        }

        const session = await this.sessionAdmin.findById(payload.sessionId);
        if (!session) throw new UnauthorizedException();

        const admin = await this.admin.findById(session.adminId);
        if (!admin || admin.status !== "ACTIVE")
            throw new UnauthorizedException();

        req.actor = { type: "admin", admin, sessionId: session.id };
        await this.sessionAdmin.touch(session.id);
        return true;
    }
}
