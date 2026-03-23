import { Email, Password } from "../fields";
import { getMessageKey } from "../../i18n";
import z from "zod";

export const ChangePasswordSchema = z
    .object({
        password: Password,
        rePassword: Password,
    })
    .refine((data) => data.password === data.rePassword, {
        message: getMessageKey("form.rePassword.same"),
        path: ["rePassword"],
    });

export type ChangePasswordDtoInput = z.input<typeof ChangePasswordSchema>;
export type ChangePasswordDtoOutput = z.infer<typeof ChangePasswordSchema>;
