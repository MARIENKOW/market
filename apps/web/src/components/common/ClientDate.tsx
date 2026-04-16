"use client";

import { TooltipProps, TypographyProps } from "@mui/material";
import { useLocale } from "next-intl";
import { useSyncExternalStore } from "react";
import { smartDate } from "@myorg/shared/utils";
import { StyledTooltip } from "@/components/ui/StyledTooltip";
import { StyledTypography } from "@/components/ui/StyledTypography";
import { AvailableLanguage } from "@myorg/shared/i18n";

interface ClientDateProps extends TypographyProps {
    date: string | number | Date;
    format?: (date: Date, locale: AvailableLanguage) => string;
    tooltipFormat?: (date: Date, locale: string) => string;
    tooltipProps?: Omit<TooltipProps, "title" | "children">;
}

const defaultFormat = (date: Date, locale: AvailableLanguage) =>
    smartDate({ date, locale });

const defaultTooltipFormat = (date: Date) => date.toLocaleString();

const noop = () => () => {};

export const ClientDate = ({
    date,
    format = defaultFormat,
    tooltipFormat = defaultTooltipFormat,
    tooltipProps,
    ...rest
}: ClientDateProps) => {
    const locale = useLocale() as AvailableLanguage;
    const d = new Date(date);

    const display = useSyncExternalStore(
        noop,
        () => format(d, locale),
        () => "",
    );

    const tooltip = useSyncExternalStore(
        noop,
        () => tooltipFormat(d, locale),
        () => "",
    );

    return (
        <StyledTooltip title={tooltip} arrow {...tooltipProps}>
            <StyledTypography
                sx={{ cursor: "pointer" }}
                suppressHydrationWarning
                {...rest}
            >
                {display}
            </StyledTypography>
        </StyledTooltip>
    );
};
