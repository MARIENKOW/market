"use client";
import {
    InputAdornment,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import { StyledFormControl } from "@/components/ui/StyledFormControl";
import { StyledInputLabel } from "@/components/ui/StyledInputLabel";
import { StyledFilledInput } from "@/components/ui/StyledFilledInput";
import { StyledIconButton } from "@/components/ui/StyledIconButton";
import { StyledFormHelperText } from "@/components/ui/StyledFormHelperText";


export const PasswordComponent = ({
    label,
    errors,
    register,
    errMessage = "incorrect data",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <StyledFormControl error={!!errors[register.name]} variant="filled">
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
                            {showPassword ? (
                                <VisibilityOff color="secondary" />
                            ) : (
                                <Visibility color="secondary" />
                            )}
                        </StyledIconButton>
                    </InputAdornment>
                }
            />
            <StyledFormHelperText>
                {errors?.[register.name] &&
                    (errors?.[register.name]?.message || errMessage)}
            </StyledFormHelperText>
        </StyledFormControl>
    );
};
