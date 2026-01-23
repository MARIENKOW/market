"use client";

import { Box, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

type MessageProp = { message?: string; reset?: () => void };

export default function ErrorElement({ message, reset }: MessageProp) {
    const t = useTranslations();
    return (
        <Box
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
            gap={2}
        >
            <Typography variant={"h2"}>{t("feedback.error.title")}</Typography>
            <Typography variant={"h5"}>
                {t("feedback.error.subtitle")}
            </Typography>
            {message && (
                <Typography variant={"body1"} color="text.secondary">
                    {message || ""}
                </Typography>
            )}
            {reset && (
                <Button
                    onClick={() => {
                        console.log("object");
                        reset();
                    }}
                    variant="contained"
                >
                    {t("feedback.error.reload")}
                </Button>
            )}
        </Box>
    );
}
