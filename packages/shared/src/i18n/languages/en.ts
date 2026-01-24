// @ts-nocheck

import { MessageStructure } from "./ua";
import {
    EMAIL_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
} from "../../form/constants";

export const en: MessageStructure = {
    form: {
        password: {
            min: `minimum ${PASSWORD_MIN_LENGTH} characters`,
            max: `maximum ${PASSWORD_MAX_LENGTH} characters`,
            invalid: `password is not correct`,
            label: `Password`,
        },
        email: {
            max: `maximum ${EMAIL_MAX_LENGTH} characters`,
            invalid: `invalid email format`,
            notFound: `Email not found`,
            unique: `email need to be unique`,
            label: `Email`,
        },
        rePassword: {
            label: `Repeat password`,
            same: "Passwords do not match",
        },
        username: {
            min: `minimum ${USERNAME_MIN_LENGTH} characters`,
            max: `maximum ${USERNAME_MAX_LENGTH} characters`,
            label: `Username`,
        },
        required: "required field",
        submit: "Submit",
        register: {
            success: "Registration successful!",
        },
        login: {
            success: "login successful!",
        },
    },
    pages: {
        main: {
            name: "Home",
        },
        register: {
            name: "Register",
        },
        login: {
            name: "Login",
        },
        notFound: {
            name: "404",
        },
    },
    api: {
        ERR_NETWORK: "No network connection. Please try again later.",
        FALLBACK_ERR: "Oops! Something went wrong, please try again later.",
        FORBIDDEN: "Not enough rights",
        auth: "Authentication error, please reload the page or sign in again",
    },
    feedback: {
        empty: {
            title: "Nothing here yet",
        },
        error: {
            fallback: {
                title: "Oops!",
                subtitle: "Something went wrong",
                reload: "reload",
            },
            auth: {
                title: "Oops!",
                subtitle: "Authentication failed",
                reload: "Refresh data",
            },
        },
    },
    features: {
        logout: {
            name: "Logout",
            success: "Log out success",
            error: "Failed to log out! Please try again later",
        },
        logoutErr: {
            name: "Reset session",
            error: "Failed to reset session! Try again later",
            success: "Session successfully reset",
        },
    },
};
