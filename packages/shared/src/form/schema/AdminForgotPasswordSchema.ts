import { Email, Password } from "../fields";
import z from "zod";

export const AdminForgotPasswordSchema = z.object({
    email: Email,
});

export type AdminForgotPasswordDtoInput = z.input<
    typeof AdminForgotPasswordSchema
>;
export type AdminForgotPasswordDtoOutput = z.infer<
    typeof AdminForgotPasswordSchema
>;
