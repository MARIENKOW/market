export type MailSendSuccess = {
    email: string;
    time: number;
    cooldown: number | false;
};

export type ChangePasswordStatus = {
    withoutPassword: boolean;
    pending: MailSendSuccess | null;
    blocked: { time: number } | null;
    cooldown: { time: number } | null;
};
