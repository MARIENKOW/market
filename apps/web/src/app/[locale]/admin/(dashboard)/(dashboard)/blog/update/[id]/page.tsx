import RedirectWithMessage from "@/components/common/RedirectWithMessage";
import ErrorHandlerElement from "@/components/feedback/error/ErrorHandlerElement";
import BlogUpdateForm from "@/components/form/BlogUpdateForm";
import BlogService from "@/services/blog/blog.service";
import { $apiAdminServer } from "@/utils/api/admin/fetch.admin.server";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { getTranslations } from "next-intl/server";

const { get } = new BlogService($apiAdminServer);

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const t = await getTranslations();

    let data;
    try {
        const body = await get(id);
        data = body.data;
    } catch (error) {
        console.log(error);
        return (
            <ErrorHandlerElement
                error={error}
                fallback={{
                    notfound: {
                        element: (
                            <RedirectWithMessage
                                path={FULL_PATH_ROUTE.admin.blog.path}
                                type="error"
                                message={t("api.NOT_FOUND")}
                            />
                        ),
                    },
                }}
            />
        );
    }

    return <BlogUpdateForm initialData={data} />;
}
