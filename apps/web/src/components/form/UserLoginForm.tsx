"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandlerWithAlert } from "@/helpers/error/error.form.helper";
import { useTranslations } from "next-intl";
import FormFilledTextField from "@/components/features/form/fields/controlled/FormTextField";
import { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import FormPassword from "@/components/features/form/fields/controlled/FormPassword";
import SimpleForm from "@/components/wrappers/form/SimpleForm";
import { StyledDivider } from "@/components/ui/StyledDivider";
import GoogleAuthButton from "@/components/features/form/GoogleAuthButton";
import { useRouter } from "@/i18n/navigation";
import AuthUserService from "@/services/auth/user/auth.user.service";
import { UserLoginDtoInput, UserLoginSchema } from "@myorg/shared/form";
import { $apiClient } from "@/lib/api/fetch.client";
import { USER_PUBLIC_FALLBACK_ROUTE } from "@myorg/shared/route";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";

const authUser = new AuthUserService($apiClient);

export default function UserLoginForm({
    redirectTo = USER_PUBLIC_FALLBACK_ROUTE,
}: {
    redirectTo?: string;
}) {
    const router = useRouter();
    const t = useTranslations();

    const onSubmit: CustomSubmitHandler<UserLoginDtoInput> = async (
        body,
        { setError },
    ) => {
        try {
            const { data } = await authUser.login(body);
            console.log(data);
            snackbarSuccess(t("form.login.success"));
            router.push(redirectTo);
            router.refresh();
        } catch (error) {
            errorFormHandlerWithAlert({ error, setError });
        }
    };

    return (
        <SimpleForm<UserLoginDtoInput>
            params={{
                resolver: zodResolver(UserLoginSchema),
                defaultValues: {
                    email: "",
                    password: "",
                },
            }}
            onSubmit={onSubmit}
        >
            <FormFilledTextField<UserLoginDtoInput>
                label={"form.email.label"}
                name={"email"}
            />
            <FormPassword<UserLoginDtoInput>
                name="password"
                label="form.password.label"
            />
            <FormAlert />
            <SubmitButton />
            <StyledDivider />
            <GoogleAuthButton />
        </SimpleForm>
    );
}
