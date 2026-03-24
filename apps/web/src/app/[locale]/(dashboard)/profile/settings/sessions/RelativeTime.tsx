"use client";

import { Typography, Tooltip } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { DATE_FNS_LOCALES, DEFAULT_LOCALE } from "./utils/locales";
import { useLocale } from "next-intl";

interface RelativeTimeProps {
    date: string;
}

export default function RelativeTime({ date }: RelativeTimeProps) {
    const locale = useLocale();

    return (
        <Tooltip title={new Date(date).toLocaleString()} placement="top" arrow>
            <Typography
                component="span"
                variant="caption"
                sx={{ cursor: "default" }}
            >
                {formatDistanceToNow(new Date(date), {
                    addSuffix: true,
                    locale: DATE_FNS_LOCALES[locale] ?? DEFAULT_LOCALE,
                })}
            </Typography>
        </Tooltip>
    );
}
