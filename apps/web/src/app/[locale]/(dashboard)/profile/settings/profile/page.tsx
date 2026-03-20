import { Box, Paper, Typography } from "@mui/material";

export default function ProfilePage() {
    return (
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
            <Typography variant="h5" fontWeight={700} mb={0.5}>
                Профиль
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
                Имя, фото, контакты
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    p: 3,
                    borderRadius: 3,
                    borderStyle: "dashed",
                    borderColor: "divider",
                }}
            >
                <Typography
                    color="text.secondary"
                    textAlign="center"
                    fontSize={14}
                >
                    Контент страницы
                </Typography>
            </Paper>
        </Box>
    );
}
