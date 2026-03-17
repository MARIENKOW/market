import { getMessageKey } from "../i18n";
import {
    EMAIL_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
} from "./constants";
import z from "zod";

export const Password = z
    .string()
    .nonempty(getMessageKey("form.required"))
    .trim()
    .normalize()
    .min(PASSWORD_MIN_LENGTH, {
        message: getMessageKey("form.password.min"),
    })
    .max(PASSWORD_MAX_LENGTH, getMessageKey("form.password.max"));

export const Email = z
    .string()
    .max(EMAIL_MAX_LENGTH, getMessageKey("form.email.max"))
    .nonempty(getMessageKey("form.required"))
    .trim()
    .normalize()
    .pipe(z.email(getMessageKey("form.email.invalid")));
