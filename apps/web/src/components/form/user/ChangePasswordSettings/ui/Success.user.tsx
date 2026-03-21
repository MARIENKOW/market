import { Box } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import { StyledButton } from "@/components/ui/StyledButton";

interface Props {
    onClose: () => void;
}

export default function ChangePasswordSettingsSuccessUser({ onClose }: Props) {
    const t = useTranslations();
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            py={3}
            textAlign="center"
        >
            <CheckCircleOutline sx={{ fontSize: 56, color: "success.main" }} />
            <StyledTypography variant="h6" fontWeight={700}>
                {t("pages.profile.settings.password.success.title")}
            </StyledTypography>
            <StyledTypography variant="body2" color="text.secondary">
                {t("pages.profile.settings.password.success.subtitle")}
            </StyledTypography>
            <StyledButton variant="contained" onClick={onClose} sx={{ mt: 1 }}>
                {t("pages.profile.settings.password.success.name")}
            </StyledButton>
        </Box>
    );
}
