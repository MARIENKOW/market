import { StyledLoadingButton } from "@/components/ui/StyledLoadingButton";
import { useFormContext, useFormState } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useTranslations } from "next-intl";
import { useFormConfig } from "@/components/wrappers/FormConfigProvider";
import { ButtonProps } from "@mui/material";
import { MessageKeyType } from "@myorg/shared/i18n";

type SubmitButtonParams = {
    variant?: ButtonProps["variant"];
    text?: MessageKeyType;
};

export default function SubmitButton({ variant, text }: SubmitButtonParams) {
    const t = useTranslations();
    const { control } = useFormContext();
    const {
        submit: { variant: configVariant, text: configText },
    } = useFormConfig();

    const { isSubmitting, errors } = useFormState({
        control,
    });

    const finalVariant = variant || configVariant;
    const finalText = text || configText;

    return (
        <StyledLoadingButton
            loading={isSubmitting}
            endIcon={<DoubleArrowIcon />}
            type="submit"
            sx={{ mt: errors?.root?.server ? 0 : 3 }}
            variant={finalVariant}
        >
            {t(finalText)}
        </StyledLoadingButton>
    );
}
