"use client";
import { Box, styled, Switch } from "@mui/material";
import { useThemeContext } from "@/theme/ThemeRegistry";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AvailableMode } from "@/theme/theme";
import { useState } from "react";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    // width: 80,
    // height: 50,
    // // padding: 7,

    width: 60,
    height: 30,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        top: "50%",
        transform: "translate(-3px,-50%)",
        // transform: "translate(8px,-50%)",
        "&.Mui-checked": {
            transform: "translate(27px,-50%)",
            // transform: "translate(37px,-50%)",

            "& + .MuiSwitch-track": {
                opacity: 1,
            },
        },
    },
    "& .MuiSwitch-thumb": {
        // width: 32,
        // height: 32,
    },
    "& .MuiSwitch-track": {
        opacity: 0.1,
        borderRadius: 99,
    },
}));

export default function ThemeChange({
    serverMode,
}: {
    serverMode: AvailableMode;
}) {
    const { themeMode, toggleTheme } = useThemeContext(serverMode);
    const [s, setS] = useState(false);

    return (
        <>
            <MaterialUISwitch
                checked={themeMode === "dark"}
                icon={
                    <Box
                        display={"flex"}
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <LightModeOutlinedIcon
                            fontSize="small"
                            sx={{ color: "text.primary" }}
                        />
                    </Box>
                }
                checkedIcon={
                    <Box
                        display={"flex"}
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <ModeNightIcon
                            fontSize="small"
                            sx={{ color: "text.primary" }}
                        />
                    </Box>
                }
                size="medium"
                onChange={() => {
                    setS(true);
                    toggleTheme();
                }}
            />
            {s&&'ssssssssssss'}
        </>
    );
}
