"use client";

import { StyledButton } from "@/components/ui/StyledButton";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import UserService from "@/services/user/user.service";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";
import { useTranslations } from "next-intl";
import { useState } from "react";

const user = new UserService($apiUserClient);

export default function Test() {
    const [loading, setLoading] = useState<boolean>(false);
    const t = useTranslations();
    const handleClick = async () => {
        try {
            // setLoading(true);
            await user.me();
        } catch (error) {
            errorHandler({ error, t });
        } finally {
            // setLoading(false);
        }
    };
    return (
        <StyledButton
            variant="contained"
            loading={loading}
            onClick={handleClick}
        >
            test
        </StyledButton>
    );
}
