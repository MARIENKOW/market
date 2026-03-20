import {
    PersonOutline,
    LockOutlined,
    NotificationsOutlined,
    PaletteOutlined,
    SecurityOutlined,
    CreditCardOutlined,
    LanguageOutlined,
} from "@mui/icons-material";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { ReactNode } from "react";
import { MessageKeyType } from "@myorg/shared/i18n";

export interface NavItem {
    label: MessageKeyType;
    href: string;
    icon: ReactNode;
}

export interface NavGroup {
    label: MessageKeyType;
    items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
    {
        label: "pages.profile.settings.groups.account",
        items: [
            {
                label: "pages.profile.settings.profile.name",
                href: FULL_PATH_ROUTE.profile.settings.profile.path,
                icon: <PersonOutline />,
            },
            {
                label: "pages.profile.settings.password.name",
                href: FULL_PATH_ROUTE.profile.settings.password.path,
                icon: <LockOutlined />,
            },
        ],
    },
    {
        label: "pages.profile.settings.groups.other",
        items: [
            {
                label: "pages.profile.settings.sessions.name",
                href: FULL_PATH_ROUTE.profile.settings.sessions.path,
                icon: <SecurityOutlined />,
            },
        ],
    },
];

export const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items);
