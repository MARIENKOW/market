import { getMessageKey } from "../i18n";
import { Email, Password } from "./fields";
import { z } from "zod";

export const UserSignUpSchema = z
    .object({
        password: Password,
        rePassword: Password,
        email: Email,
    })
    .refine((data) => data.password === data.rePassword, {
        message: getMessageKey("form.rePassword.same"),
        path: ["rePassword"],
    });

export type UserSignUpDto = z.infer<typeof UserSignUpSchema>;
