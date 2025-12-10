import { Link } from "@/i18n/navigation";
import { Button } from "@mui/material";
import { route } from "@myorg/shared/route";
import { getTranslations } from "next-intl/server";

export default async function Main() {
    const t = await getTranslations();
    return (
        <Link href={route.public.signup}>
            <Button>{t("pages.signup.name")}</Button>
        </Link>
    );
}
