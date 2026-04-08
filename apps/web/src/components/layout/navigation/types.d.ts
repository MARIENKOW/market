export interface NavItem {
    label: MessageKeyType;
    href: string;
    icon: ReactNode;
    activeLink: string[];
}

export interface NavGroup {
    label?: MessageKeyType;
    items: NavItem[];
}
