"use client";

import { enqueueSnackbar } from "notistack";
import { UserSignUpSchema, UserSignUpDto } from "@myorg/shared/form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandler } from "@/helpers/error/errorFormHandler";
import { useTranslations } from "next-intl";
import { PasswordComponent } from "@/components/fields/PasswordComponent";
import FormFilledTextField from "@/components/fields/FormFilledTextField";
import { CustomSubmitHandler } from "@/components/wrappers/Form";
import SimpleForm from "@/components/wrappers/SimpleForm";
import SubmitButton from "@/components/fields/SubmitButton";
import FormAlert from "@/components/fields/FormAlert";

export default function UserSignUpForm() {
    const t = useTranslations();

    const onSubmit: CustomSubmitHandler<UserSignUpDto> = async (
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
        <SimpleForm
            params={{
                resolver: zodResolver(UserSignUpSchema),
                defaultValues: {
                    email: "",
                    password: "",
                    rePassword: "",
                },
            }}
            onSubmit={onSubmit}
        >
            <FormFilledTextField<UserSignUpDto>
                label={"form.email.label"}
                name={"email"}
            />
            <FormFilledTextField<UserSignUpDto>
                label={"form.password.label"}
                name={"password"}
            />
            <FormFilledTextField<UserSignUpDto>
                label={"form.rePassword.label"}
                name={"rePassword"}
            />
            {/* <PasswordComponent
                label={t("form.password.label")}
                error={!!errors["password"]}
                helperText={
                    errors["password"]?.message
                        ? t(errors["password"].message as MessageKeyType)
                        : undefined
                }
                register={register("password")}
            />
            <PasswordComponent
                label={t("form.rePassword.label")}
                error={!!errors["rePassword"]}
                helperText={
                    errors["rePassword"]?.message
                        ? t(errors["rePassword"].message as MessageKeyType)
                        : undefined
                }
                register={register("rePassword")}
            /> */}
            <FormAlert />
            <SubmitButton  />
        </SimpleForm>
    );
}
