"use client";

import { enqueueSnackbar } from "notistack";

import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandler } from "@/helpers/error/errorFormHandler";
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
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { UserLoginDtoInput, UserLoginSchema } from "@myorg/shared/form";

const authUser = new AuthUserService();

export default function UserLoginForm() {
    const router = useRouter();
    const t = useTranslations();

    const onSubmit: CustomSubmitHandler<UserLoginDtoInput> = async (
        body,
        { setError },
    ) => {
        try {
            const { data } = await authUser.login(body);
            console.log(data);
            enqueueSnackbar(t("form.login.success"), { variant: "success" });
            router.push(FULL_PATH_ROUTE.path);
        } catch (e) {
            errorFormHandler(e, setError);
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
