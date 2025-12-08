import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
} from "./validateConfig";
import z from "zod";

export const Password = z
    .string()
    .nonempty("form.required")
    .min(PASSWORD_MIN_LENGTH, "form.password.min")
    .max(PASSWORD_MAX_LENGTH, "form.password.max");
