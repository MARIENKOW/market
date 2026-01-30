import { Email, Password } from "../fields";
import z from "zod";

export const UserForgotPasswordSchema = z.object({
    email: Email,
});

export type UserForgotPasswordDtoInput = z.input<
    typeof UserForgotPasswordSchema
>;
export type UserForgotPasswordDtoOutput = z.infer<
    typeof UserForgotPasswordSchema
>;
