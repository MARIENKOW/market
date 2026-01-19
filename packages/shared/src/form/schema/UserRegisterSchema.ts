import { Email, NumberBase, Password } from "../fields";
import { getMessageKey } from "../../i18n";
import z from "zod";

export const UserRegisterSchema = z
    .object({
        password: Password,
        rePassword: Password,
        email: Email,
        // number: NumberBase,
    })
    .refine((data) => data.password === data.rePassword, {
        message: getMessageKey("form.rePassword.same"),
        path: ["rePassword"],
    });

export type UserRegisterDtoInput = z.input<typeof UserRegisterSchema>;
export type UserRegisterDtoOutput = z.infer<typeof UserRegisterSchema>;
