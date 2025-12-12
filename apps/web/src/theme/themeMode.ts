import { AvailableMode, defaultThemeMode, modes } from "@/theme/theme";
import { cookies } from "next/headers";

export async function getThemeMode() {
    const cookie = await cookies();

    const cookieValue = cookie.get("theme")?.value || defaultThemeMode;

    const mode: AvailableMode = modes.includes(cookieValue as AvailableMode)
        ? (cookieValue as AvailableMode)
        : defaultThemeMode;

    return mode;
}
