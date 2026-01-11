import { getTranslations } from "next-intl/server";

export default async function Main() {
    const t = await getTranslations();
    return null;
}
