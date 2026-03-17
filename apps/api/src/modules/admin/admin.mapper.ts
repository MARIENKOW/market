import { Admin } from "@/generated/prisma";
import { AdminDto } from "@myorg/shared/dto";

export const mapAdmin = (admin: Admin): AdminDto => ({
    id: admin.id,
    email: admin.email,
    theme: admin.theme,
    role: admin.role,
    locale: admin.locale,
});
