import { StyledButton } from "@/components/ui/StyledButton";
import { CircularProgress, LinearProgress } from "@mui/material";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function SignOutButton() {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await signOut();
        setLoading(false);
    };
    return (
        <StyledButton loading={loading} onClick={handleClick}>
            {t("features.signOut.name")}
        </StyledButton>
    );
}
