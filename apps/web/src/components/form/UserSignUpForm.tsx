"use client";

import { enqueueSnackbar } from "notistack";
import { UserSignUpSchema, UserSignUpDtoInput } from "@myorg/shared/form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandler } from "@/helpers/error/errorFormHandler";
import { useTranslations } from "next-intl";
import { PasswordComponent } from "@/components/fields/uncontrolled/PasswordComponent";
import FormFilledTextField from "@/components/fields/controlled/FormTextField";
import Form, { CustomSubmitHandler } from "@/components/wrappers/Form";
import SimpleForm from "@/components/wrappers/SimpleForm";
import SubmitButton from "@/components/fields/SubmitButton";
import FormAlert from "@/components/fields/FormAlert";
import { Input, TextField } from "@mui/material";
import FormPassword from "@/components/fields/controlled/FormPassword";
import { NumberFieldCommponent } from "@/components/fields/uncontrolled/NumberFieldCommponent";
import FormNumberField from "@/components/fields/controlled/FormNumberField";
import useForm from "@/hooks/useForm";
import { FormConfigProvider } from "@/components/wrappers/FormConfigProvider";
import FormProvider from "@/components/wrappers/FormProvider";
import { useEffect } from "react";
import { useFormContext, useFormState, useWatch } from "react-hook-form";

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
    }, [password, trigger]);

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
            </Form>
        </FormProvider>
    );
}
