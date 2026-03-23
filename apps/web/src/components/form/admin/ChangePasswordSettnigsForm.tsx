"use client";

import ChangePasswordSettings from "@/components/form/ChangePasswordSettings";
import ChangePasswordAdminService from "@/services/admin/changePassword.admin.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";
import { MailSendSuccess } from "@myorg/shared/dto";

type Props = {
    initialMailSendSuccess: MailSendSuccess | null;
    withoutPassword: boolean;
};

const { init } = new ChangePasswordAdminService($apiAdminClient);
const { initWithoutPassword } = new ChangePasswordAdminService($apiAdminClient);
const { confirm } = new ChangePasswordAdminService($apiAdminClient);
const { cancel } = new ChangePasswordAdminService($apiAdminClient);
const { resend } = new ChangePasswordAdminService($apiAdminClient);

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
