"use client";

import { SessionAdminViewDto } from "@myorg/shared/dto";

import { SessionCard } from "@/components/common/session/SessionCard";
import SessionServiceAdmin from "@/services/auth/admin/session.service.admin";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";

interface SessionCardProps {
    session: SessionAdminViewDto;
}

const { revoke } = new SessionServiceAdmin($apiAdminClient);
export const SessionCardAdmin = ({ session }: SessionCardProps) => {
    return <SessionCard onRevoke={revoke} session={session} />;
};
