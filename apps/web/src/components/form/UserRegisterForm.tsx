"use client";

import { enqueueSnackbar } from "notistack";
import {
    UserRegisterDtoInput,
    UserRegisterDtoOutput,
    UserRegisterSchema,
} from "@myorg/shared/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandler } from "@/helpers/error/errorFormHandler";
import { useTranslations } from "next-intl";
import FormFilledTextField from "@/components/features/form/fields/controlled/FormTextField";
import Form, { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import FormPassword from "@/components/features/form/fields/controlled/FormPassword";
import useForm from "@/hooks/useForm";
import FormProvider from "@/components/wrappers/form/FormProvider";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { StyledDivider } from "@/components/ui/StyledDivider";
import GoogleAuthButton from "@/components/features/form/GoogleAuthButton";
import { useRouter } from "@/i18n/navigation";

import AuthUserService from "@/services/auth/user/auth.user.service";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { $apiClient } from "@/lib/api/fetch.client";

const authUser = new AuthUserService($apiClient);

export default function UserRegisterForm() {
    const t = useTranslations();
    const router = useRouter();

    const form = useForm<UserRegisterDtoInput>({
        resolver: zodResolver(UserRegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            rePassword: "",
        },
    });

    const { trigger, control } = form;

    const password = useWatch<UserRegisterDtoInput>({
        name: "password",
        control,
    });
    const rePassword = useWatch<UserRegisterDtoInput>({
        name: "rePassword",
        control,
    });

    useEffect(() => {
        if (!password || !rePassword) return;
        trigger("rePassword");
    }, [password, trigger, rePassword]);

    const onSubmit: CustomSubmitHandler<UserRegisterDtoOutput> = async (
        data,
        { setError },
    ) => {
        try {
            await authUser.register(data);
            enqueueSnackbar(t("form.register.success"), { variant: "success" });
            router.push(FULL_PATH_ROUTE.login.path);
        } catch (e) {
            errorFormHandler(e, setError);
        }
    };

    return (
        <FormProvider<UserRegisterDtoInput> form={form}>
            <Form<UserRegisterDtoInput> form={form} onSubmit={onSubmit}>
                <FormFilledTextField<UserRegisterDtoInput>
                    label={"form.email.label"}
                    name={"email"}
                />
                <FormPassword<UserRegisterDtoInput>
                    name="password"
                    label="form.password.label"
                />
                <FormPassword<UserRegisterDtoInput>
                    name="rePassword"
                    label="form.rePassword.label"
                />
                <FormAlert />
                <SubmitButton />
                <StyledDivider />
                <GoogleAuthButton />
            </Form>
        </FormProvider>
    );
}
