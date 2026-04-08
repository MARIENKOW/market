"use client";

import { BlogList } from "@/app/[locale]/admin/(dashboard)/(dashboard)/blog/BlogList";
import DeleteAllBlogs from "@/app/[locale]/admin/(dashboard)/(dashboard)/blog/DeleteAllBlogs";
import { PaginationComponent } from "@/components/common/PaginationComponent";
import { StyledButton } from "@/components/ui/StyledButton";
import { StyledDivider } from "@/components/ui/StyledDivider";
import { StyledTypography } from "@/components/ui/StyledTypography";
import { useBlogs } from "@/hooks/tanstack/useBlog";
import { Link } from "@/i18n/navigation";
import { Box, LinearProgress } from "@mui/material";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { useTranslations } from "next-intl";

export default function BlogComponent() {
    const t = useTranslations();
    const { data, isFetching, error, page, setPage } = useBlogs();
    return (
        <Box display="flex" flexDirection="column" flex={1} height="100%">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
                mb={2}
                flexWrap="wrap"
            >
                <StyledTypography variant="h5" fontWeight={700}>
                    {t("pages.admin.blog.name")}
                    {data?.meta.total ? ` · ${data?.meta.total}` : ""}
                </StyledTypography>
                <Box gap={1} display={"flex"} alignItems={"center"}>
                    {data && data.data.length > 0 ? <DeleteAllBlogs /> : ""}
                    <Link href={FULL_PATH_ROUTE.admin.blog.create.path}>
                        <StyledButton variant="contained">
                            {t("pages.admin.blog.create.name")}
                        </StyledButton>
                    </Link>
                </Box>
            </Box>
            <StyledDivider />
            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                position="relative"
                gap={2}
                py={2}
            >
                {isFetching && (
                    <LinearProgress
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                        }}
                    />
                )}

                <BlogList data={data?.data} error={error} />
                <PaginationComponent
                    page={page}
                    count={data?.meta.pageCount ?? 1}
                    onChange={setPage}
                    disabled={isFetching}
                />
            </Box>
        </Box>
    );
}
