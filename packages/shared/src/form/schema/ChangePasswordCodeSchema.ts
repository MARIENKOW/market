import z from "zod";
import { getMessageKey } from "../../i18n";
import { CHANGE_PASSWORD_OTP_LENGTH } from "../constants";

export const ChangePasswordCodeSchema = z.object({
    code: z
        .string()
        .length(CHANGE_PASSWORD_OTP_LENGTH, getMessageKey("form.code.length"))
        .regex(/^\d+$/, getMessageKey("form.code.digits")),
});

export type ChangePasswordCodeDtoInput = z.input<
    typeof ChangePasswordCodeSchema
>;
export type ChangePasswordCodeDtoOutput = z.output<
    typeof ChangePasswordCodeSchema
>;
