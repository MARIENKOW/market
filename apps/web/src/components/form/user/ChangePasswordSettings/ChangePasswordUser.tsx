"use client";

import ChangePasswordUserService from "@/services/user/changePassword.user.service";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";
import ChangePasswordForm from "./index";
import { MailSendSuccess } from "@/services/user/changePassword.user.service";

interface Props {
    initialMailSendSuccess: MailSendSuccess | null;
    withoutPassword: boolean;
}

const service = new ChangePasswordUserService($apiUserClient);

export default function ChangePasswordUser(props: Props) {
    return (
        <ChangePasswordForm
            {...props}
            actions={{
                init: async (dto) => (await service.init(dto)).data,
                initWithoutPassword: async (dto) =>
                    (await service.initWithoutPassword(dto)).data,
                confirm: async (dto) => {
                    await service.confirm(dto);
                },
                resend: async () => (await service.resend()).data,
                cancel: async () => {
                    await service.cancel();
                },
            }}
        />
    );
}
