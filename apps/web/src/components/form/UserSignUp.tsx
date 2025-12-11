"use client";

import { StyledAlert } from "@/components/ui/StyledAlert";
import { Button, Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { enqueueSnackbar } from "notistack";
import { PasswordComponent } from "@/components/fields/PasswordComponent";
import { StyledLoadingButton } from "@/components/ui/StyledLoadingButton";
import {
    UserSignUpSchema,
    UserSignUpDto,
} from "../../../../../packages/shared/src/form";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandler } from "@/helpers/errorFormHandler";
import { useTranslations } from "next-intl";
import { useThemeContext } from "@/theme/ThemeRegistry";

export default function UserSignUp() {
    const t = useTranslations();

    const { themeMode, toggleTheme } = useThemeContext();

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
            await axios.get("https://sdsdc");
            enqueueSnackbar(t("form.signup.success"), { variant: "success" });
        } catch (e) {
            errorFormHandler(e, setError);
        }
    };

    return (
        <>
            <Typography
                fontWeight={600}
                color={"primary"}
                sx={{ textAlign: "center", mb: 3 }}
                id="transition-modal-title"
                variant="h6"
                component="h2"
            >
                {t("pages.signup.name")}
            </Typography>

            <Button variant="contained" color="primary" onClick={toggleTheme}>
                {themeMode}
            </Button>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <PasswordComponent
                    label={t("form.password.label")}
                    error={!!errors["password"]}
                    helperText={
                        errors["password"]?.message
                            ? t(errors["password"].message)
                            : undefined
                    }
                    register={register("password")}
                />
                {errors?.root?.server?.message && (
                    <StyledAlert severity="error">
                        {t(errors.root.server.message)}
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
