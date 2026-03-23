import {
    ChangePasswordCodeDtoOutput,
    ChangePasswordDtoOutput,
    ChangePasswordSettingsDtoOutput,
} from "@myorg/shared/form";
import { FetchCustomReturn } from "@/utils/api";
import { MailSendSuccess } from "@myorg/shared/dto";

export interface ChangePasswordActions {
    init?: (dto: ChangePasswordSettingsDtoOutput) => FetchCustomReturn<MailSendSuccess>;
    initWithoutPassword?: (
        dto: ChangePasswordDtoOutput,
    ) => FetchCustomReturn<MailSendSuccess>;
    confirm: (dto: ChangePasswordCodeDtoOutput) => FetchCustomReturn<void>;
    resend: () => FetchCustomReturn<MailSendSuccess>;
    cancel: () => FetchCustomReturn<void>;
}

export interface ChangePasswordFormProps {
    initialMailSendSuccess: MailSendSuccess | null;
    withoutPassword: boolean;
    actions: ChangePasswordActions;
}
