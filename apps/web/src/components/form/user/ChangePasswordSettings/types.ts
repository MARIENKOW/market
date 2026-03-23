import {
    UserChangePasswordCodeDtoOutput,
    UserChangePasswordDtoOutput,
    UserChangePasswordSettingsDtoOutput,
} from "@myorg/shared/form";
import { MailSendSuccess } from "@/services/user/changePassword.user.service";
import { Dispatch, SetStateAction } from "react";

export interface ChangePasswordActions {
    init?: (dto: UserChangePasswordSettingsDtoOutput) => Promise<MailSendSuccess>;
    initWithoutPassword?: (dto: UserChangePasswordDtoOutput) => Promise<MailSendSuccess>;
    confirm: (dto: UserChangePasswordCodeDtoOutput) => Promise<void>;
    resend: () => Promise<MailSendSuccess>;
    cancel: () => Promise<void>;
}

export interface ChangePasswordFormProps {
    initialMailSendSuccess: MailSendSuccess | null;
    withoutPassword: boolean;
    actions: ChangePasswordActions;
}
