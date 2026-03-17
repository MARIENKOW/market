"use client";

import LogoutMenuItem from "@/components/features/auth/admin/LogoutMenuItem.admin";
import { StyledAvatar } from "@/components/ui/StyledAvatar";
import { StyledIconButton } from "@/components/ui/StyledIconButton";
import { StyledListItemIcon } from "@/components/ui/StyledListItemIcon";
import { StyledListItemText } from "@/components/ui/StyledListItemText";
import { StyledMenu } from "@/components/ui/StyledMenu";
import { StyledMenuItem } from "@/components/ui/StyledMenuItem";
import { StyledTooltip } from "@/components/ui/StyledTooltip";
import { Link } from "@/i18n/navigation";
import { Box, ButtonBase } from "@mui/material";
import { AdminDto } from "@myorg/shared/dto";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import { StyledDivider } from "@/components/ui/StyledDivider";
import { StyledButton } from "@/components/ui/StyledButton";
import { StyledTypography } from "@/components/ui/StyledTypograpty";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";

export default function NavigationAdmin({ admin }: { admin: AdminDto }) {
    const [open, setOpen] = useState<boolean>(false);
    const t = useTranslations();
    const menuRef = useRef(null);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleCLose = () => {
        setOpen(false);
    };
    return (
        <>
            <StyledTooltip title={t("pages.profile.name")}>
                <StyledIconButton
                    size="small"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    ref={menuRef}
                    sx={{ overflow: "hidden", borderRadius: 999 }}
                    onClick={handleOpen}
                >
                    <StyledAvatar></StyledAvatar>
                </StyledIconButton>
            </StyledTooltip>
            <StyledMenu
                anchorEl={menuRef.current}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                onClose={handleCLose}
                open={open}
            >
                <Box
                    pl={1}
                    pr={1}
                    pb={1}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={1}
                >
                    <Box p={1} alignItems={"center"} display={"flex"} gap={2}>
                        <Box
                            display={"flex"}
                            alignItems={"end"}
                            flexDirection={"column"}
                        >
                            <Box
                                display={"inline-flex"}
                                gap={0.5}
                                alignItems={"end"}
                            >
                                <StyledTypography
                                    fontSize={10}
                                    color="primary"
                                    variant="body2"
                                >
                                    {admin.role}
                                </StyledTypography>
                                {admin.role === "SUPERADMIN" && (
                                    <StarPurple500Icon color="primary" />
                                )}
                            </Box>
                            <StyledTypography>{admin.email}</StyledTypography>
                        </Box>
                    </Box>
                </Box>

                <StyledDivider />
                <Link href={FULL_PATH_ROUTE.admin.settings.path}>
                    <StyledMenuItem onClick={handleCLose}>
                        <StyledListItemIcon>
                            <SettingsOutlinedIcon />
                        </StyledListItemIcon>
                        <StyledListItemText>
                            {t("pages.admin.settings.name")}
                        </StyledListItemText>
                    </StyledMenuItem>
                </Link>
                <LogoutMenuItem />
            </StyledMenu>
        </>
    );
}
