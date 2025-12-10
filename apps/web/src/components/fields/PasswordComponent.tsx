"use client";
import { InputAdornment } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { MouseEvent, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import { StyledFormControl } from "@/components/ui/StyledFormControl";
import { StyledInputLabel } from "@/components/ui/StyledInputLabel";
import { StyledFilledInput } from "@/components/ui/StyledFilledInput";
import { StyledIconButton } from "@/components/ui/StyledIconButton";
import { StyledFormHelperText } from "@/components/ui/StyledFormHelperText";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

type PasswordComponentProps = {
    label: string;
    error: boolean;
    register: UseFormRegisterReturn;
    helperText?: string;
};

export const PasswordComponent = ({
    label,
    error,
    register,
    helperText,
}: PasswordComponentProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <StyledFormControl error={error} variant="filled">
            <StyledInputLabel
                htmlFor={`outlined-adornment-password-${register.name}`}
            >
                {label}
            </StyledInputLabel>
            <StyledFilledInput
                {...register}
                type={showPassword ? "text" : "password"}
                id={`outlined-adornment-password-${register.name}`}
                endAdornment={
                    <InputAdornment position="end">
                        <StyledIconButton
                            onClick={() => setShowPassword((state) => !state)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </StyledIconButton>
                    </InputAdornment>
                }
            />
            <StyledFormHelperText>{helperText}</StyledFormHelperText>
        </StyledFormControl>
    );
};
