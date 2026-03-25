"use client";

import { SessionUserViewDto } from "@myorg/shared/dto";
import SessionServiceUser from "@/services/auth/user/session.service.user";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";
import { SessionCard } from "@/components/common/session/SessionCard";

interface SessionCardProps {
    session: SessionUserViewDto;
}

const { revoke } = new SessionServiceUser($apiUserClient);

export const SessionCardUser = ({ session }: SessionCardProps) => {
    return <SessionCard onRevoke={revoke} session={session} />;
};
