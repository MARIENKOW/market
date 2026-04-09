import { NavGroup } from "@/components/layout/navigation/types";
import { AllPathsFromRoute, FULL_PATH_ROUTE } from "@myorg/shared/route";
import NewspaperIcon from "@mui/icons-material/Newspaper";

export const NAV_GROUPS: NavGroup[] = [
    {
        items: [
            {
                label: "pages.admin.blog.name",
                href: FULL_PATH_ROUTE.admin.blog.path,
                activeLink: {
                    strict: [
                        FULL_PATH_ROUTE.admin.path,
                        // ...AllPathsFromRoute(FULL_PATH_ROUTE.admin.blog),
                    ],
                    safe: [FULL_PATH_ROUTE.admin.blog.path],
                },
                icon: <NewspaperIcon />,
            },
        ],
    },
];

export const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items);
