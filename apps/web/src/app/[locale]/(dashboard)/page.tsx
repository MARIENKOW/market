import { getUserAuth } from "@/utils/cache/user.cache.me";
import { getTranslations } from "next-intl/server";

export default async function Main() {
    const t = await getTranslations();
    const { user } = await getUserAuth();
    return user?.email;
}
