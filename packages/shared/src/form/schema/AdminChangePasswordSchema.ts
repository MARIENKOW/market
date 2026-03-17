import { Email, Password } from "../fields";
import { getMessageKey } from "../../i18n";
import z from "zod";

export const AdminChangePasswordSchema = z
    .object({
        password: Password,
        rePassword: Password,
    })
    .refine((data) => data.password === data.rePassword, {
        message: getMessageKey("form.rePassword.same"),
        path: ["rePassword"],
    });

export type AdminChangePasswordDtoInput = z.input<
    typeof AdminChangePasswordSchema
>;
export type AdminChangePasswordDtoOutput = z.infer<
    typeof AdminChangePasswordSchema
>;
