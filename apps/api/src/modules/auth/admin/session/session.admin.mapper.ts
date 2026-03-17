import { SessionAdmin } from "@/generated/prisma";
import { SessionAdminDto } from "@myorg/shared/dto";

export const mapSessionAdmin = (SessionAdmin: SessionAdmin): SessionAdminDto => ({
    id: SessionAdmin.id,
    userAgent: SessionAdmin.userAgent,
    ip: SessionAdmin.ip,
    createdAt: SessionAdmin.createdAt,
    lastUsedAt: SessionAdmin.lastUsedAt,
});
