export type AdminDto = {
    id: string;
    email: string;
    role: "ADMIN" | "SUPERADMIN";
    locale: string | null;
    theme: string | null;
};
