"use client";

import { useState } from "react";
import { Box, Collapse } from "@mui/material";
import ChangePasswordSettingsStep1User from "./steps/Step1.user";
import ChangePasswordSettingsStep2User from "./steps/Step2.user";
import ChangePasswordStepper from "@/components/form/user/ChangePasswordSettings/ui/Stepper.user";
import { MailSendSuccess } from "@/services/user/changePassword.user.service";
import ChangePasswordSettingsStep1WPUser from "@/components/form/user/ChangePasswordSettings/steps/Step1WithoutPassword.user";

type Step = 0 | 1;

interface Props {
    initialMailSendSuccess: MailSendSuccess | null;
    withoutPassword: boolean;
}

export default function ChangePasswordForm({
    initialMailSendSuccess,
    withoutPassword,
}: Props) {
    const [step, setStep] = useState<Step>(initialMailSendSuccess ? 1 : 0);
    const [mailSendSuccess, setMailSendSuccess] = useState<MailSendSuccess>(
        initialMailSendSuccess || {
            email: "",
            time: 0,
            cooldown: false,
        },
    );

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
                    {withoutPassword ? (
                        <ChangePasswordSettingsStep1WPUser
                            onSuccess={handleStep1Success}
                        />
                    ) : (
                        <ChangePasswordSettingsStep1User
                            onSuccess={handleStep1Success}
                        />
                    )}
                </Collapse>

                <Collapse in={step === 1} unmountOnExit>
                    <ChangePasswordSettingsStep2User
                        mailSendSuccess={mailSendSuccess}
                        setMailSendSuccess={setMailSendSuccess}
                        onCancel={() => setStep(0)}
                    />
                </Collapse>
            </Box>
        </Box>
    );
}
