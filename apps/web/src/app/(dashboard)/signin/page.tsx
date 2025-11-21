"use client";

import { StyledAlert } from "@/components/ui/StyledAlert";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { enqueueSnackbar } from "notistack";
import { PasswordComponent } from "@/components/fields/PasswordComponent";
import { StyledLoadingButton } from "@/components/ui/StyledLoadingButton";

export default function SignIn() {
    const {
        handleSubmit,
        register,
        setError,
        clearErrors,
        formState: { errors, isValid, isSubmitting },
    } = useForm({ mode: "onChange" });

    const handleChange = () => {
        clearErrors("root");
    };

    const onSubmit = async (data: any) => {
        try {
            // await signInAdmin(data);
            await new Promise((res)=>{
                setTimeout(res,3000)
            })
            enqueueSnackbar(`Авторизация успешна!`, { variant: "success" });
        } catch (e) {
            // console.error(e);
            // if (e?.response?.status === 400) {
            //     const errors = e?.response?.data || {};
            //     for (let key in errors) {
            //         setError(key, { type: "server", message: errors[key] });
            //     }
            //     return;
            // }
            setError("root.server", {
                type: "server",
                message: "Упс! Что-то пошло не так, попробуйте позже",
            });
        }
    };

    return (
        <>
            <Typography
                fontWeight={600}
                color={!isValid ? "secondary" : "primary"}
                sx={{ textAlign: "center", mb: 3 }}
                id="transition-modal-title"
                variant="h6"
                component="h2"
            >
                Авторизация
            </Typography>
            <form
                onChange={handleChange}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <PasswordComponent
                    label={"Пароль"}
                    errors={errors}
                    register={register("password", {
                        required: "обязательное поле",
                        // maxLength: {
                        //     value: ADMIN_PASSWORD_MAX_LENGTH,
                        //     message: `максимум ${ADMIN_PASSWORD_MAX_LENGTH} символов`,
                        // },
                    })}
                />
                {errors?.root?.server && (
                    <StyledAlert
                        severity="error"
                        variant="filled"
                        hidden={true}
                    >
                        {errors?.root?.server?.message}
                    </StyledAlert>
                )}
                <StyledLoadingButton
                    loading={isSubmitting}
                    endIcon={<DoubleArrowIcon />}
                    disabled={!isValid}
                    type="submit"
                    sx={{ mt: errors?.root?.server ? 0 : 3 }}
                    variant="contained"
                >
                    Подтвердить
                </StyledLoadingButton>
            </form>
        </>
    );
}
