import { StyledLoadingButton } from "@/components/ui/StyledLoadingButton";
import { useFormContext, useFormState } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useTranslations } from "next-intl";

export default function SubmitButton() {
    const t = useTranslations();
    const { control } = useFormContext();

    const { isSubmitting, errors } = useFormState({
        control,
    });

    return (
        <StyledLoadingButton
            loading={isSubmitting}
            endIcon={<DoubleArrowIcon />}
            type="submit"
            sx={{ mt: errors?.root?.server ? 0 : 3 }}
            variant="contained"
        >
            {t("form.submit")}
        </StyledLoadingButton>
    );
}
