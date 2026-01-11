"use client";

import { StyledButton } from "@/components/ui/StyledButton";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { RoutePaths } from "@myorg/shared/route";

export default function GoogleAuthButton({
    redirectTo,
}: {
    redirectTo?: RoutePaths;
}) {
    return (
        <StyledButton
            variant="outlined"
            onClick={() =>
                signIn("google", {
                    redirectTo: redirectTo,
                })
            }
        >
            <GoogleIcon />
        </StyledButton>
    );
}
