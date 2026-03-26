"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { StyledButton } from "@/components/ui/StyledButton";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import {
    ApiErrorResponse,
    ErrorsWithMessages,
    MailSendSuccess,
} from "@myorg/shared/dto";
import ChangePasswordUserService from "@/services/user/changePassword.user.service";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";
import { formatDuration } from "@myorg/shared/utils";

interface Props {
    initialCooldown: number | false;
    onCancel: () => void;
    setMailSendSuccess: Dispatch<SetStateAction<MailSendSuccess>>;
}

const { resend } = new ChangePasswordUserService($apiUserClient);

export default function ResendPasswordChange({
    initialCooldown,
    onCancel,
    setMailSendSuccess,
}: Props) {
    const t = useTranslations();
    const [cooldown, setCooldown] = useState<number | false>(initialCooldown);
    const [resending, setResending] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const locale = useLocale();

    const startTimer = (seconds: number | false) => {
        clearInterval(timerRef.current!);
        setCooldown(seconds);
        if (seconds === false || seconds <= 0) return;

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
            const body = await resend();
            setMailSendSuccess(body.data);
            startTimer(body.data.cooldown);
        } catch (error) {
            errorHandler({
                error,
                t,
                fallback: {
                    notfound: {
                        callback: onCancel,
                    },
                    validation: {
                        callback() {
                            const { data } = error as ApiErrorResponse; // [!] const
                            const { root } = data as ErrorsWithMessages; // [!] const
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
                ? t("features.changePassword.resend.name")
                : t("features.changePassword.resend.cooldown", {
                      time: formatDuration(cooldown, locale),
                  })}
        </StyledButton>
    );
}
