"use client";

import ChangePasswordSettings from "@/components/form/ChangePasswordSettings";
import ChangePasswordUserService from "@/services/user/changePassword.user.service";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";
import { MailSendSuccess } from "@myorg/shared/dto";

type Props = {
    initialMailSendSuccess: MailSendSuccess | null;
    withoutPassword: boolean;
};

const { init } = new ChangePasswordUserService($apiUserClient);
const { initWithoutPassword } = new ChangePasswordUserService($apiUserClient);
const { confirm } = new ChangePasswordUserService($apiUserClient);
const { cancel } = new ChangePasswordUserService($apiUserClient);
const { resend } = new ChangePasswordUserService($apiUserClient);

export default function ChangePasswordSettingsForm(props: Props) {
    return (
        <ChangePasswordSettings
            {...props}
            actions={{
                init,
                initWithoutPassword,
                cancel,
                confirm,
                resend,
            }}
        />
    );
}
