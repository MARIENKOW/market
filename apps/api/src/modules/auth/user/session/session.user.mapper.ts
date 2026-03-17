import { SessionUser } from "@/generated/prisma";
import { SessionUserDto } from "@myorg/shared/dto";

export const mapSessionUser = (SessionUser: SessionUser): SessionUserDto => ({
    id: SessionUser.id,
    userAgent: SessionUser.userAgent,
    ip: SessionUser.ip,
    createdAt: SessionUser.createdAt,
    lastUsedAt: SessionUser.lastUsedAt,
});
