import { Email, NumberBase, Password } from "../fields";
import { getMessageKey } from "../../i18n";
import z from "zod";

export const UserSignInSchema = z.object({
    password: Password,
    email: Email,
});

export type UserSignInDtoInput = z.input<typeof UserSignInSchema>;
