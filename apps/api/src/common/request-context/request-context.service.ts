// common/request-context/request-context.service.ts
import { Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";

interface RequestContext {
    origin: string;
}

@Injectable()
export class RequestContextService {
    private storage = new AsyncLocalStorage<RequestContext>();

    run(context: RequestContext, callback: () => void) {
        this.storage.run(context, callback);
    }

    get origin(): string {
        const origin = process.env.ALLOWED_ORIGIN
            ? process.env.ALLOWED_ORIGIN.split(",")
            : [];
            
        return (
            this.storage.getStore()?.origin ??
            origin[0] ??
            "http://localhost:3000"
        );
    }
}
