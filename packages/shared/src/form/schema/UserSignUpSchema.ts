import { Email, NumberBase, Password } from "../fields";
import { getMessageKey } from "../../i18n";
import z from "zod";

export const UserSignUpSchema = z
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

export type UserSignUpDtoInput = z.input<typeof UserSignUpSchema>;
export type UserSignUpDtoOutput = z.infer<typeof UserSignUpSchema>;
