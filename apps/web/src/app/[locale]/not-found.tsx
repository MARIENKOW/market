import { getTranslations } from "next-intl/server";

export default async function NotFound() {
    const t = await getTranslations();
    return t("pages.notFound.name");
}
