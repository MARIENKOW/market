import { Email, Password } from "../fields";
import z from "zod";

export const ForgotPasswordSchema = z.object({
    email: Email,
});

export type ForgotPasswordDtoInput = z.input<typeof ForgotPasswordSchema>;
export type ForgotPasswordDtoOutput = z.infer<typeof ForgotPasswordSchema>;
