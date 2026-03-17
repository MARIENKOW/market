import { Email, Password } from "../fields";
import z from "zod";

export const AdminLoginSchema = z.object({
    password: Password,
    email: Email,
});

export type AdminLoginDtoInput = z.input<typeof AdminLoginSchema>;
export type AdminLoginDtoOutput = z.infer<typeof AdminLoginSchema>;
