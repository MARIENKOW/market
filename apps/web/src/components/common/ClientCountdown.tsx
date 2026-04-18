"use client";

import { useEffect, useState } from "react";
import { TypographyProps } from "@mui/material";
import { useLocale } from "next-intl";
import { formatDuration } from "@myorg/shared/utils";
import { StyledTypography } from "@/components/ui/StyledTypography";
import { AvailableLanguage } from "@myorg/shared/i18n";

interface ClientCountdownProps extends TypographyProps {
    expiresAt: string | Date;
    formatLabel?: (duration: string) => string;
}

function getRemaining(target: number, locale: AvailableLanguage): string {
    return formatDuration(Math.max(0, target - Date.now()), locale);
}

export function ClientCountdown({ expiresAt, formatLabel, ...rest }: ClientCountdownProps) {
    const locale = useLocale() as AvailableLanguage;
    const target = new Date(expiresAt).getTime();
    const [duration, setDuration] = useState(() => getRemaining(target, locale));

    useEffect(() => {
        const id = setInterval(() => setDuration(getRemaining(target, locale)), 1_000);
        return () => clearInterval(id);
    }, [target, locale]);

    return <StyledTypography {...rest}>{formatLabel ? formatLabel(duration) : duration}</StyledTypography>;
}
