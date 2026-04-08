import BlogComponent from "@/app/[locale]/admin/(dashboard)/(dashboard)/blog/BlogComponent";
import BreadcrumbsComponent from "@/components/features/Breadcrumbs/BreadcrumbsComponent";
import { ContainerComponent } from "@/components/ui/Container";
import { StyledButton } from "@/components/ui/StyledButton";
import { Link } from "@/i18n/navigation";
import { Hydrate } from "@/lib/tanstack/Hydrate";
import { blogKeys } from "@/lib/tanstack/keys";
import { getQueryClient } from "@/lib/tanstack/queryClient";
import BlogService from "@/services/blog/blog.service";
import { $apiAdminServer } from "@/utils/api/admin/fetch.admin.server";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";
import { Box } from "@mui/material";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { getTranslations } from "next-intl/server";
import * as uuid from "uuid";

const { getAll } = new BlogService($apiAdminServer);

export default async function BlogPage() {
    const queryClient = getQueryClient();
    try {
        await queryClient.prefetchQuery({
            queryKey: blogKeys.list({ page: 1 }),
            queryFn: async () => (await getAll({ page: 1 })).data,
        });
    } catch (error) {}
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
                            name: t("pages.admin.blog.name"),
                            href: FULL_PATH_ROUTE.admin.blog.path,
                            key: uuid.v4(),
                        },
                    ]}
                />
            </Box>
            <Hydrate>
                <BlogComponent />
            </Hydrate>
        </ContainerComponent>
    );
}
