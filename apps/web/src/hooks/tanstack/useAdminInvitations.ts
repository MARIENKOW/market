import { usePaginatedQuery } from "@/hooks/tanstack/usePaginatedQuery";
import { invitationKeys } from "@/lib/tanstack/keys";
import AdminInvitationService from "@/services/admin/invitation/adminInvitation.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";

const { getAll } = new AdminInvitationService($apiAdminClient);

export function useAdminInvitations() {
    return usePaginatedQuery(
        (page) => invitationKeys.list({ page }),
        (page) => getAll({ page }).then((r) => r.data),
    );
}
