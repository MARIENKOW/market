// types/express.d.ts
import { Actor } from "@/auth/actor.type";

declare global {
    namespace Express {
        interface Request {
            actor?: Actor;
        }
    }
}
