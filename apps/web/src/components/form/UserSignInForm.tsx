"use client";

import { enqueueSnackbar } from "notistack";
import { UserSignInSchema, UserSignInDtoInput } from "@myorg/shared/form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandler } from "@/helpers/error/errorFormHandler";
import { useTranslations } from "next-intl";
import FormFilledTextField from "@/components/features/form/fields/controlled/FormTextField";
import Form, { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import FormPassword from "@/components/features/form/fields/controlled/FormPassword";
import SimpleForm from "@/components/wrappers/form/SimpleForm";
import { signIn } from "next-auth/react";
import { StyledDivider } from "@/components/ui/StyledDivider";
import GoogleAuthButton from "@/components/features/form/GoogleAuthButton";
import { route } from "@myorg/shared/route";

export default function UserSignInForm() {
    const t = useTranslations();

    const onSubmit: CustomSubmitHandler<UserSignInDtoInput> = async (
        data,
        { setError }
    ) => {
        try {
            await signIn("credentials", data);
            enqueueSnackbar(t("form.signup.success"), { variant: "success" });
        } catch (e) {
            errorFormHandler(e, setError);
        }
    };

    return (
        <SimpleForm<UserSignInDtoInput>
            params={{
                resolver: zodResolver(UserSignInSchema),
                defaultValues: {
                    email: "",
                    password: "",
                },
            }}
            onSubmit={onSubmit}
        >
            <FormFilledTextField<UserSignInDtoInput>
                label={"form.email.label"}
                name={"email"}
            />
            <FormPassword<UserSignInDtoInput>
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
