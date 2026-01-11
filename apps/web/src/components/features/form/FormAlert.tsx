import { StyledAlert } from "@/components/ui/StyledAlert";
import { MessageKeyType } from "@myorg/shared/i18n";
import { useTranslations } from "next-intl";
import { useFormContext, useFormState } from "react-hook-form";

export default function FormAlert() {
    const t = useTranslations();
    const { control } = useFormContext();
    
    const { errors } = useFormState({
        control,
    });
    if (!errors?.root?.server?.message) return null;
    return (
        <StyledAlert severity="error">
            {t(errors.root.server.message as MessageKeyType)}
        </StyledAlert>
    );
}
