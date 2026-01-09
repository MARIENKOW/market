"use client";
import { InputAdornment, TextFieldProps } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { MouseEvent, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import { StyledFormControl } from "@/components/ui/StyledFormControl";
import { StyledInputLabel } from "@/components/ui/StyledInputLabel";
import { StyledFilledInput } from "@/components/ui/StyledFilledInput";
import { StyledIconButton } from "@/components/ui/StyledIconButton";
import { StyledFormHelperText } from "@/components/ui/StyledFormHelperText";
import InputComponent from "@/components/fields/uncontrolled/InputComponent";
import { FieldValue, FieldValues } from "react-hook-form";

type PasswordComponentProps = {
    label: string;
    error?: boolean;
    helperText?: string;
    variant?: TextFieldProps["variant"];
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export const PasswordComponent = ({
    label,
    error,
    helperText,
    variant,
    value,
    onChange,
}: PasswordComponentProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <StyledFormControl error={error} variant={variant}>
            <StyledInputLabel>{label}</StyledInputLabel>
            <InputComponent
                label={label}
                variant={variant}
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
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
