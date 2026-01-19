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
    },
    feedback: {
        empty: {
            title: "Nothing here yet",
        },
        error: {
            title: "Oops!",
            subtitle: "Something went wrong",
            reload: "reload",
        },
    },
    features: {
        logout: {
            name: "Logout",
        },
    },
};
