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
            label: `Password`,
        },
        email: {
            max: `maximum ${EMAIL_MAX_LENGTH} characters`,
            invalid: `invalid email format`,
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
        signup: {
            success: "Registration successful!",
        },
    },
    pages: {
        main: {
            name: "Home",
        },
        signup: {
            name: "Sign Up",
        },
        signin: {
            name: "Sign In",
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
        signOut: {
            name: "Sign out",
        },
    },
};
