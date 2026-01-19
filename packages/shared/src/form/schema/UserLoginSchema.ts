import { Email, Password } from "../fields";
import z from "zod";

export const UserLoginSchema = z.object({
    password: Password,
    email: Email,
});

export type UserLoginDtoInput = z.input<typeof UserLoginSchema>;
export type UserLoginDtoOutput = z.infer<typeof UserLoginSchema>;
