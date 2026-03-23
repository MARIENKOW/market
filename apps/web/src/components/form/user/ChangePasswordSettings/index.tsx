"use client";

import { useState } from "react";
import { Box, Collapse } from "@mui/material";
import ChangePasswordSettingsStep1User from "./steps/Step1.user";
import ChangePasswordSettingsStep2User from "./steps/Step2.user";
import ChangePasswordSettingsSuccessUser from "@/components/form/user/ChangePasswordSettings/ui/Success.user";
import ChangePasswordStepper from "@/components/form/user/ChangePasswordSettings/ui/Stepper.user";
import { MailSendSuccess } from "@/services/user/changePassword.user.service";

type Step = 0 | 1 | 2;

interface Props {
    /** 0 = шаг 1, 1 = шаг 2 (pending запрос уже есть) */
    initialStep: Step;
    /** замаскированный email если запрос уже был отправлен */
    initialSuccess: MailSendSuccess;
}

export default function ChangePasswordForm({
    initialStep,
    initialSuccess,
}: Props) {
    const [step, setStep] = useState<Step>(initialStep);
    const [mailSendSuccess, setMailSendSuccess] =
        useState<MailSendSuccess>(initialSuccess);

    const handleStep1Success = (success: MailSendSuccess) => {
        setMailSendSuccess(success);
        setStep(1);
    };

    return (
        <Box>
            <Box mb={7}>
                <ChangePasswordStepper activeStep={step} />
            </Box>
            <Box width={"100%"} maxWidth={400} mx={"auto"}>
                <Collapse in={step === 0} unmountOnExit>
                    <ChangePasswordSettingsStep1User
                        onSuccess={handleStep1Success}
                    />
                </Collapse>

                <Collapse in={step === 1} unmountOnExit>
                    <ChangePasswordSettingsStep2User
                        mailSendSuccess={mailSendSuccess}
                        onSuccess={() => setStep(2)}
                        setMailSendSuccess={setMailSendSuccess}
                        onCancel={() => setStep(0)}
                    />
                </Collapse>

                <Collapse in={step === 2} unmountOnExit>
                    <ChangePasswordSettingsSuccessUser
                        onClose={() => setStep(0)}
                    />
                </Collapse>
            </Box>
        </Box>
    );
}
