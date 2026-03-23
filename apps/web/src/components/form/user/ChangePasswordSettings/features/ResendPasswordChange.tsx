"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { StyledButton } from "@/components/ui/StyledButton";
import { formatDuration } from "@/utils/formatDuration";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { MailSendSuccess } from "@/services/user/changePassword.user.service";

interface Props {
    onResend: () => Promise<MailSendSuccess>;
    initialCooldown: number | false;
}

export default function ResendPasswordChange({
    onResend,
    initialCooldown,
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
            errorHandler({ error, t });
        } finally {
            setResending(false);
        }
    };

    return (
        <StyledButton
            variant="text"
            size="small"
            disabled={cooldown === false || cooldown > 0}
            onClick={handleClick}
            loading={resending}
        >
            {cooldown === false || cooldown <= 0
                ? t("pages.profile.settings.password.resend")
                : t("pages.profile.settings.password.resendIn", {
                      time: formatDuration(cooldown, locale),
                  })}
        </StyledButton>
    );
}
