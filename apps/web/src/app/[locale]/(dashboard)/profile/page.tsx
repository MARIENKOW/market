import { getUserAuth } from "@/utils/cache/user.cache.me";

export default async function Page() {
    const { user } = await getUserAuth();
    return user?.email;
}
