import z from "zod";
import { Password } from "../fields";
import { getMessageKey } from "../../i18n";

export const UserChangePasswordSettingsSchema = z
    .object({
        currentPassword: Password,
        newPassword: Password,
        rePassword: Password,
    })
    .refine((data) => data.newPassword === data.rePassword, {
        message: getMessageKey("form.rePassword.same"),
        path: ["rePassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: getMessageKey("form.newPassword.sameAsCurrent"),
        path: ["newPassword"],
    });

export type UserChangePasswordSettingsDtoInput = z.input<
    typeof UserChangePasswordSettingsSchema
>;
export type UserChangePasswordSettingsDtoOutput = z.output<
    typeof UserChangePasswordSettingsSchema
>;
