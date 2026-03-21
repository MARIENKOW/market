"use client";

import { useState } from "react";
import { Box, Collapse } from "@mui/material";
import ChangePasswordSettingsStep1User from "./steps/Step1.user";
import ChangePasswordSettingsStep2User from "./steps/Step2.user";
import ChangePasswordSettingsSuccessUser from "@/components/form/user/ChangePasswordSettings/ui/Success.user";
import ChangePasswordStepper from "@/components/form/user/ChangePasswordSettings/ui/Stepper.user";

type Step = 0 | 1 | 2;

export type Success = {
    email: string;
    time: number;
};
interface Props {
    /** 0 = шаг 1, 1 = шаг 2 (pending запрос уже есть) */
    initialStep: Step;
    /** замаскированный email если запрос уже был отправлен */
    initialSuccess: Success;
    onCancel?: () => void;
}

export default function ChangePasswordForm({
    initialStep,
    initialSuccess,
    onCancel,
}: Props) {
    const [step, setStep] = useState<Step>(initialStep);
    const [success, setSuccess] = useState<Success>(initialSuccess);

    const handleStep1Success = (success: Success) => {
        setSuccess(success);
        setStep(1);
    };

    return (
        <Box>
            <Box mb={3}>
                <ChangePasswordStepper activeStep={step} />
            </Box>

            <Collapse in={step === 0} unmountOnExit>
                <ChangePasswordSettingsStep1User
                    onSuccess={handleStep1Success}
                />
            </Collapse>

            <Collapse in={step === 1} unmountOnExit>
                <ChangePasswordSettingsStep2User
                    success={success}
                    onSuccess={() => setStep(2)}
                    onCancel={() => setStep(0)}
                />
            </Collapse>

            <Collapse in={step === 2} unmountOnExit>
                <ChangePasswordSettingsSuccessUser
                    onClose={onCancel ?? (() => setStep(0))}
                />
            </Collapse>
        </Box>
    );
}
