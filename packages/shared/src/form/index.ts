import { Password } from "@myorg/shared/form/fields";
import { z } from "zod";

export const UserSignUpSchema = z.object({
    password: Password,
});

export type UserSignUpDto = z.infer<typeof UserSignUpSchema>;
