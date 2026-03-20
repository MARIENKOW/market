import {
    Box,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    Divider,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { NAV_GROUPS } from "./_components/nav.config";
import { getTranslations } from "next-intl/server";

export default async function SettingsPage() {
    const t = await getTranslations();
    return (
        <>
            {/* Десктоп: sidebar сам управляет навигацией, эта страница не видна */}
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    p: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "text.disabled",
                }}
            >
                <Typography variant="body2">Выберите раздел</Typography>
            </Box>

            {/* Мобильная: список всех разделов */}
            <Box sx={{ display: { xs: "block", md: "none" }, p: 2 }}>
                <Typography variant="h6" sx={{ px: 1, my: 2, fontWeight: 700 }}>
                    {t("pages.profile.settings.name")}
                </Typography>
                {NAV_GROUPS.map((group, gi) => (
                    <Box key={gi} mb={2}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                px: 1,
                                mb: 0.5,
                                display: "block",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                            }}
                        >
                            {t(group.label)}
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 3,
                                overflow: "hidden",
                            }}
                        >
                            {group.items.map((item, idx) => (
                                <Box key={item.label}>
                                    <ListItemButton
                                        href={item.href}
                                        sx={{ borderRadius: 0, py: 1.5 }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 36,
                                                color: "text.secondary",
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={t(item.label)} />

                                        <ChevronRight
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: 20,
                                            }}
                                        />
                                    </ListItemButton>
                                    {idx < group.items.length - 1 && (
                                        <Divider />
                                    )}
                                </Box>
                            ))}
                        </Paper>
                    </Box>
                ))}
            </Box>
        </>
    );
}
