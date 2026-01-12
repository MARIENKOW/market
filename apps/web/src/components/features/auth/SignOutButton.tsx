import { StyledButton } from "@/components/ui/StyledButton";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function SignOutButton() {
    const t = useTranslations();

    const handleClick = async () => await signOut();
    return (
        <StyledButton onClick={handleClick}>
            {t("features.signOut.name")}
        </StyledButton>
    );
}
