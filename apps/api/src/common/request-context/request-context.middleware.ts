// common/request-context/request-context.middleware.ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { RequestContextService } from "./request-context.service";

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    constructor(private context: RequestContextService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const originAllowed = process.env.ALLOWED_ORIGIN
            ? process.env.ALLOWED_ORIGIN.split(",")
            : [];

        const origin =
            req.headers.origin ??
            req.headers.referer ??
            originAllowed[0] ??
            "http://localhost:3000";

        this.context.run({ origin }, () => next());
    }
}
