"use client";

import { Box } from "@mui/material";
import { ALL_ITEMS } from "./nav.config";
import { usePathname } from "@/i18n/navigation";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { useTranslations } from "next-intl";
import BreadcrumbsComponent from "@/components/features/Breadcrumbs/BreadcrumbsComponent";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export function MobileNav() {
    const pathname = usePathname();
    const t = useTranslations();

    const activeItem = ALL_ITEMS.find((i) => i.href === pathname);
    const isRoot = pathname === FULL_PATH_ROUTE.profile.settings.path;

    if (isRoot) return null;

    return (
        <Box sx={{ display: "flex", alignItems: "center", p: 1.5, gap: 1 }}>
            <BreadcrumbsComponent
                options={
                    activeItem?.label
                        ? [
                              {
                                  name: "pages.profile.settings.name",
                                  href: FULL_PATH_ROUTE.profile.settings.path,
                                  nameType: "key",
                                  key: "sett",
                              },
                              {
                                  name: activeItem?.label,
                                  href: FULL_PATH_ROUTE.profile.settings.path,
                                  nameType: "key",
                                  key: "sett2",
                              },
                          ]
                        : [
                              {
                                  name: "pages.profile.settings.name",
                                  href: FULL_PATH_ROUTE.profile.settings.path,
                                  nameType: "key",
                                  key: "sett",
                              },
                          ]
                }
            />
        </Box>
    );
}
