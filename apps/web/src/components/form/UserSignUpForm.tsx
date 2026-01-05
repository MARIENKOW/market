"use client";

import { StyledAlert } from "@/components/ui/StyledAlert";
import { Button, Typography, useColorScheme } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { enqueueSnackbar } from "notistack";
import { PasswordComponent } from "@/components/fields/PasswordComponent";
import { StyledLoadingButton } from "@/components/ui/StyledLoadingButton";
import { UserSignUpSchema, UserSignUpDto } from "@myorg/shared/form";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandler } from "@/helpers/errorFormHandler";
import { useTranslations } from "next-intl";
import { AxiosError } from "axios";
import { StyledTextField } from "@/components/ui/StyledTextField";
import { MessageKeyType } from "@myorg/shared/i18n";

export default function UserSignUpForm() {
    const t = useTranslations();

    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<UserSignUpDto>({
        resolver: zodResolver(UserSignUpSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: UserSignUpDto) => {
        try {
            console.log(data);
            await axios.get("https://sdsdc");
            enqueueSnackbar(t("form.signup.success"), { variant: "success" });
        } catch (e) {
            errorFormHandler(e, setError);
        }
    };

    return (
        <>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <StyledTextField
                    variant="filled"
                    label={t("form.email.label")}
                    error={!!errors["email"]}
                    helperText={
                        errors["email"]?.message
                            ? t(errors["email"].message as MessageKeyType)
                            : undefined
                    }
                    {...register("email")}
                />
                <PasswordComponent
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
                />
                {errors?.root?.server?.message && (
                    <StyledAlert severity="error">
                        {t(errors.root.server.message as MessageKeyType)}
                    </StyledAlert>
                )}
                <StyledLoadingButton
                    loading={isSubmitting}
                    endIcon={<DoubleArrowIcon />}
                    type="submit"
                    sx={{ mt: errors?.root?.server ? 0 : 3 }}
                    variant="contained"
                >
                    {t("form.submit")}
                </StyledLoadingButton>
            </form>
        </>
    );
}
