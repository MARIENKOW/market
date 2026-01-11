"use client";

import { enqueueSnackbar } from "notistack";
import { UserSignUpSchema, UserSignUpDtoInput } from "@myorg/shared/form";
import axios from "axios";
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

export default function UserSignUpForm() {
    const t = useTranslations();

    const form = useForm<UserSignUpDtoInput>({
        resolver: zodResolver(UserSignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            rePassword: "",
        },
    });

    const { trigger, control } = form;

    const password = useWatch<UserSignUpDtoInput>({
        name: "password",
        control,
    });
    const rePassword = useWatch<UserSignUpDtoInput>({
        name: "rePassword",
        control,
    });

    useEffect(() => {
        if (!password || !rePassword) return;
        trigger("rePassword");
    }, [password, trigger, rePassword]);

    const onSubmit: CustomSubmitHandler<UserSignUpDtoInput> = async (
        data,
        { setError }
    ) => {
        try {
            console.log(data);
            await axios.get("https://sdsdc");
            enqueueSnackbar(t("form.signup.success"), { variant: "success" });
        } catch (e) {
            errorFormHandler(e, setError);
        }
    };

    return (
        <FormProvider<UserSignUpDtoInput> form={form}>
            <Form<UserSignUpDtoInput> form={form} onSubmit={onSubmit}>
                <FormFilledTextField<UserSignUpDtoInput>
                    label={"form.email.label"}
                    name={"email"}
                />
                <FormPassword<UserSignUpDtoInput>
                    name="password"
                    label="form.password.label"
                />
                <FormPassword<UserSignUpDtoInput>
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
