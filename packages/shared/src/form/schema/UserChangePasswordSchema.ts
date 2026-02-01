import { Email, Password } from "../fields";
import { getMessageKey } from "../../i18n";
import z from "zod";

export const UserChangePasswordSchema = z
    .object({
        password: Password,
        rePassword: Password,
    })
    .refine((data) => data.password === data.rePassword, {
        message: getMessageKey("form.rePassword.same"),
        path: ["rePassword"],
    });

export type UserChangePasswordDtoInput = z.input<
    typeof UserChangePasswordSchema
>;
export type UserChangePasswordDtoOutput = z.infer<
    typeof UserChangePasswordSchema
>;
