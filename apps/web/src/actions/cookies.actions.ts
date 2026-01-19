"use server";

import { cookies } from "next/headers";

export async function getCookieValue(value: string) {
    const cookieStore = await cookies();
    const resValue = cookieStore.get(value)?.value || null;
    return resValue;
}
