"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { StyledButton } from "@/components/ui/StyledButton";
import { formatDuration } from "@/utils/formatDuration";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { MailSendSuccess } from "@/services/user/changePassword.user.service";
import { ApiErrorResponse, ErrorsWithMessages } from "@myorg/shared/dto";

interface Props {
    onResend: () => Promise<MailSendSuccess>;
    initialCooldown: number | false;
    onCancel: () => void;
}

export default function ResendPasswordChange({
    onResend,
    initialCooldown,
    onCancel,
}: Props) {
    const t = useTranslations();
    const [cooldown, setCooldown] = useState<number | false>(initialCooldown);
    const [resending, setResending] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const locale = useLocale();

    const startTimer = (seconds: number | false) => {
        clearInterval(timerRef.current!);
        setCooldown(seconds);
        if (seconds === false) return;

        if (seconds <= 0) return;

        timerRef.current = setInterval(() => {
            setCooldown((s) => {
                if (s === false || s <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return s - 1000;
            });
        }, 1000);
    };

    useEffect(() => {
        startTimer(cooldown);
        return () => clearInterval(timerRef.current!);
    }, []);

    const handleClick = async () => {
        setResending(true);
        try {
            const data = await onResend();
            startTimer(data.cooldown);
        } catch (error) {
            errorHandler({
                error,
                t,
                fallback: {
                    notfound: {
                        callback: () => {
                            onCancel();
                        },
                    },
                    validation: {
                        callback() {
                            let { data } = error as ApiErrorResponse;
                            let { root } = data as ErrorsWithMessages;
                            console.log(root?.[0]?.data);
                            if (root?.[0]?.data?.return) onCancel();
                        },
                    },
                },
            });
        } finally {
            setResending(false);
        }
    };

    if (cooldown === false) return null;
    return (
        <StyledButton
            variant="text"
            size="small"
            disabled={cooldown > 0}
            onClick={handleClick}
            loading={resending}
        >
            {cooldown <= 0
                ? t("pages.profile.settings.password.resend")
                : t("pages.profile.settings.password.resendIn", {
                      time: formatDuration(cooldown, locale),
                  })}
        </StyledButton>
    );
}
