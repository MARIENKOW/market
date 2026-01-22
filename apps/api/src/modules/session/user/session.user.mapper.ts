import { UserSession } from '@/generated/prisma';
import { UserSessionDto } from '@myorg/shared/dto';

export const mapUserSession = (userSession: UserSession): UserSessionDto => ({
  id: userSession.id,
  userAgent: userSession.userAgent,
  ip: userSession.ip,
  createdAt: userSession.createdAt,
  lastUsedAt: userSession.lastUsedAt,
});
