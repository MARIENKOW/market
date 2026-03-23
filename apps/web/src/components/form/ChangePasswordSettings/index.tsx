"use client";

import { useState } from "react";
import { Box, Collapse } from "@mui/material";
import { ChangePasswordFormProps } from "./types";
import ChangePasswordStepper from "./ui/Stepper.user";
import Step1 from "./steps/Step1";
import Step1WithoutPassword from "./steps/Step1WithoutPassword";
import Step2 from "./steps/Step2";
import { MailSendSuccess } from "@myorg/shared/dto";

type Step = 0 | 1;

export default function ChangePasswordForm({
    initialMailSendSuccess,
    withoutPassword,
    actions,
}: ChangePasswordFormProps) {
    const [step, setStep] = useState<Step>(initialMailSendSuccess ? 1 : 0);
    const [mailSendSuccess, setMailSendSuccess] = useState<MailSendSuccess>(
        initialMailSendSuccess ?? {
            email: "",
            time: 0,
            cooldown: false,
        },
    );

    const handleStep1Success = (success: MailSendSuccess) => {
        setMailSendSuccess(success);
        setStep(1);
    };

    const handleCancel = () => setStep(0);

    return (
        <Box>
            <Box mb={7}>
                <ChangePasswordStepper activeStep={step} />
            </Box>
            <Box width={"100%"} maxWidth={400} mx={"auto"}>
                <Collapse in={step === 0} unmountOnExit>
                    {withoutPassword ? (
                        <Step1WithoutPassword
                            onSuccess={handleStep1Success}
                            onInit={actions.initWithoutPassword!}
                        />
                    ) : (
                        <Step1
                            onSuccess={handleStep1Success}
                            onInit={actions.init!}
                        />
                    )}
                </Collapse>

                <Collapse in={step === 1} unmountOnExit>
                    <Step2
                        mailSendSuccess={mailSendSuccess}
                        setMailSendSuccess={setMailSendSuccess}
                        onCancel={handleCancel}
                        onConfirm={actions.confirm}
                        onResend={actions.resend}
                        onCancelRequest={actions.cancel}
                    />
                </Collapse>
            </Box>
        </Box>
    );
}
