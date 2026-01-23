"use client";

import { StyledButton } from "@/components/ui/StyledButton";
import GoogleIcon from "@mui/icons-material/Google";

export default function GoogleAuthButton({
    redirectTo,
}: {
    redirectTo?: string;
}) {
    return (
        <StyledButton variant="outlined" onClick={() => {}}>
            <GoogleIcon />
        </StyledButton>
    );
}
