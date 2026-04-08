import BreadcrumbsComponent from "@/components/features/Breadcrumbs/BreadcrumbsComponent";
import { ContainerComponent } from "@/components/ui/Container";
import { StyledButton } from "@/components/ui/StyledButton";
import { Link } from "@/i18n/navigation";
import { Box } from "@mui/material";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { getTranslations } from "next-intl/server";
import * as uuid from "uuid";

export default async function BlogPage() {
    const t = await getTranslations();
    return (
        <ContainerComponent maxWidth={false} marging={false}>
            <Box display={"flex"} justifyContent={"space-between"}>
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

                <Link href={FULL_PATH_ROUTE.admin.blog.create.path}>
                    <StyledButton variant="contained">
                        {t("pages.admin.blog.create.name")}
                    </StyledButton>
                </Link>
            </Box>
        </ContainerComponent>
    );
}
