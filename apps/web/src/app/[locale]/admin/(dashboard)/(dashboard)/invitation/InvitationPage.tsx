import BreadcrumbsComponent from "@/components/features/Breadcrumbs/BreadcrumbsComponent";
import { ContainerComponent } from "@/components/ui/Container";
import { Hydrate } from "@/lib/tanstack/Hydrate";
import { invitationKeys } from "@/lib/tanstack/keys";
import { getQueryClient } from "@/lib/tanstack/queryClient";
import AdminInvitationService from "@/services/admin/invitation/adminInvitation.service";
import { $apiAdminServer } from "@/utils/api/admin/fetch.admin.server";
import { Box } from "@mui/material";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { getTranslations } from "next-intl/server";
import * as uuid from "uuid";
import InvitationComponent from "@/app/[locale]/admin/(dashboard)/(dashboard)/invitation/InvitationComponent";
import { parseListParams } from "@/lib/tanstack/parseListParams";
import { defaultInvitationParams } from "@/lib/tanstack/listDefaults";

const { getAll } = new AdminInvitationService($apiAdminServer);

export default async function InvitationPage({
    searchParams,
}: {
    searchParams: Promise<unknown>;
}) {
    const params = await searchParams;
    const parsed = parseListParams(params, defaultInvitationParams);
    const queryKey = invitationKeys.list(parsed);
    const queryClient = getQueryClient();
    try {
        await queryClient.prefetchQuery({
            queryKey,
            queryFn: async () => (await getAll(parsed)).data,
        });
    } catch {}

    const t = await getTranslations();
    return (
        <ContainerComponent maxWidth={false} marging={false}>
            <Box mb={4} display={{ xs: "block", md: "none" }}>
                <BreadcrumbsComponent
                    options={[
                        {
                            name: t("pages.admin.name"),
                            href: FULL_PATH_ROUTE.admin.path,
                            key: uuid.v4(),
                        },
                        {
                            name: t("pages.admin.invitation.name"),
                            href: FULL_PATH_ROUTE.admin.invitation.path,
                            key: uuid.v4(),
                        },
                    ]}
                />
            </Box>
            <Hydrate>
                <InvitationComponent />
            </Hydrate>
        </ContainerComponent>
    );
}
