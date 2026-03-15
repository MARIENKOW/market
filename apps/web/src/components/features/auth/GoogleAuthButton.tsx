"use client";

import {
    CredentialResponse,
    GoogleLogin,
    useGoogleLogin,
    useGoogleOneTapLogin,
} from "@react-oauth/google";
import { StyledButton } from "@/components/ui/StyledButton";
import GoogleIcon from "@mui/icons-material/Google";
import { useRef, useState } from "react";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";
import { snackbarError } from "@/utils/snackbar/snackbar.error";
import { useTranslations } from "next-intl";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { useRouter } from "@/i18n/navigation";

const auth = new AuthUserService($apiUserClient);

export default function GoogleAuthButton({
    redirectTo,
}: {
    redirectTo?: string;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    // const l = useGoogleOneTapLogin({
    //     onSuccess: (r) => {
    //         console.log(r);
    //     }, // сразу id_token ✅
    //     onError: () => console.error("failed"),
    // });

    const t = useTranslations();
    const router = useRouter();
    const login = useGoogleLogin({
        onSuccess: async (r) => {
            try {
                await auth.google({ code: r.code });
                snackbarSuccess(t("pages.login.feedback.success.loginSuccess"));
                if (redirectTo) router.push(redirectTo);
                router.refresh();
            } catch (error) {
                errorHandler({ error, t });
            }finally{
                setLoading(false)
            }
        },
        onError: () => snackbarError(t("api.FALLBACK_ERR")),
        flow: "auth-code",
    });

    return (
        <StyledButton
            loading={loading}
            onClick={() => {
                setLoading(true);
                login();
            }}
            variant="outlined"
        >
            <GoogleIcon />
        </StyledButton>
    );
}
