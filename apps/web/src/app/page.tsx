import { redirect } from "next/navigation";
import { defaultLanguage } from "../../../../packages/shared/src/i18n";

export default function HomeRedirect() {
    redirect(`/${defaultLanguage}`);
}
