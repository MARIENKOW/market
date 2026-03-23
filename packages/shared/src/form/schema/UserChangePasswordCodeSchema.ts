import z from "zod";
import { getMessageKey } from "../../i18n";
import { CHANGE_PASSWORD_OTP_LENGTH } from "../constants";

export const UserChangePasswordCodeSchema = z.object({
    code: z
        .string()
        .length(CHANGE_PASSWORD_OTP_LENGTH, getMessageKey("form.code.length"))
        .regex(/^\d+$/, getMessageKey("form.code.digits")),
});

export type UserChangePasswordCodeDtoInput = z.input<
    typeof UserChangePasswordCodeSchema
>;
export type UserChangePasswordCodeDtoOutput = z.output<
    typeof UserChangePasswordCodeSchema
>;
