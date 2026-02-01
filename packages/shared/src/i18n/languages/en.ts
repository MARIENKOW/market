import { MessageStructure } from "./uk";
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
        forgotPasssword: {
            changePassword: {
                name: "Enter new password",
                feedback: {
                    errors: {
                        timeout:
                            "The reset link has expired! Please request a new one.",
                        notFound:
                            "The link is invalid! Please request a new one.",
                    },
                },
            },
            name: "Forgot password?",
            feedback: {
                errors: {
                    alreadySent:
                        "The recovery link email has already been sent. Link expiration time: {time}",
                },
                success:
                    "A password reset link has been sent. Link expiration time: {time}",
            },
        },
        notFound: {
            name: "404",
        },
    },
    api: {
        ERR_NETWORK: "No network connection. Please try again later.",
        FALLBACK_ERR: "Oops! Something went wrong, please try again later.",
        FORBIDDEN: "Not enough rights",
        UNAUTHORIZED: "You are not authorized! Please sign in",
        NOT_FOUND: "Content not found",
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
            network: {
                title: "Oops!",
                subtitle: "No network connection",
                reload: "reload",
            },
            forbidden: {
                title: "Oops!",
                subtitle: "Insufficient permissions",
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
    mail: {
        resetPassword: {
            title: "Password recovery",
            text: "Password recovery",
            button: "Reset password",
            exsited: "Link expiration time: {time}",
        },
    },
};
