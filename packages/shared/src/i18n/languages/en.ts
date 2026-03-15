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
            invalid: `Incorrect password`,
            label: `Password`,
        },
        email: {
            max: `maximum ${EMAIL_MAX_LENGTH} characters`,
            invalid: `Invalid email format`,
            notFound: `Email not found`,
            unique: `Email must be unique`,
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
        required: "Required field",
        submit: "Submit",
    },
    pages: {
        main: {
            name: "Home",
        },
        register: {
            name: "Sign up",
            feedback: {
                success: {
                    registerSuccess: "Registration successful!",
                    mailSend:
                        "Registration successful! An activation link has been sent to your email. Valid for: {time}",
                },
            },
            login: "Already have an account?",
        },
        login: {
            name: "Log in",
            feedback: {
                success: {
                    loginSuccess: "Login successful!",
                },
                errors: {
                    notActive: "Account is not activated.",
                    passwordNotFound: `Password is not set! Click: "{btn}"`,
                    sendMail:
                        "Account is not activated. Send an activation email.",
                    expire: "Account is not activated. The activation link has expired. Send a new email.",
                    alreadySend:
                        "Account is not activated. An activation email has already been sent. Valid for: {time}",
                },
            },
            register: "Don’t have an account?",
        },
        activate: {
            feedback: {
                success: {
                    accountActivate: "Account successfully activated.",
                },
                errors: {
                    notValid: "The link is invalid!",
                    expired: "The link has expired",
                },
            },
        },
        forgotPassword: {
            changePassword: {
                name: "Change password",
                feedback: {
                    success: {
                        changeSuccess: "Password changed successfully!",
                    },
                    errors: {
                        timeout:
                            "The password reset link has expired. Please repeat the sending procedure.",
                        notFound:
                            "The link is invalid. Please repeat the sending procedure.",
                    },
                },
            },
            name: "Forgot password?",
            login: "Back to login",
            feedback: {
                errors: {
                    alreadySent:
                        "A password reset email has already been sent. Link valid for: {time}",
                },
                success:
                    "A password reset email has been sent. Link valid for: {time}",
            },
        },
        profile: {
            name: "My account",
            settings: {
                name: "Settings",
            },
        },
        notFound: {
            name: "404",
        },
    },
    api: {
        ERR_NETWORK: "No network connection. Try again later.",
        FALLBACK_ERR: "Oops! Something went wrong, please try again later.",
        FORBIDDEN: "Insufficient permissions",
        UNAUTHORIZED: "You are not authorized. Please log in.",
        NOT_FOUND: "Error 404",
        ABORT_ERROR: "Request was canceled",
        auth: "Authentication error, reload the page or log in again.",
    },
    feedback: {
        empty: {
            title: "Nothing here yet",
        },
        error: {
            network: {
                title: "Oops!",
                subtitle: "No network connection.",
                reload: "Reload",
            },
            fallback: {
                title: "Oops!",
                subtitle: "Something went wrong",
                reload: "Reload",
            },
            resetToken: {
                title: "Oops!",
                subtitle: "Something went wrong",
            },
            activate: {
                title: "Oops!",
                subtitle: "Something went wrong",
                reload: "Send email",
            },
            forbidden: {
                title: "Oops!",
                subtitle: "Insufficient permissions",
                reload: "Reload",
            },
            auth: {
                title: "Oops!",
                subtitle: "Authentication failed",
                reload: "Request data again",
            },
            unauthorized: {
                title: "Oops!",
                subtitle: "You are not authorized",
                reload: "Request data again",
            },
        },
    },
    features: {
        theme: {
            name: "Theme",
        },
        language: {
            name: "Language",
        },
        logout: {
            name: "Log out",
            error: "Failed to log out. Try again later.",
            success: "You have successfully logged out.",
        },
        logoutErr: {
            name: "Reset session",
            error: "Failed to reset the session. Try again later.",
            success: "You have successfully reset the session.",
        },
        activate: {
            name: "Send email",
            error: {
                alreadySend:
                    "An email with a link has already been sent. Link valid for: {time}",
                alreadyActive: "User is already activated",
            },
            success: {
                sendSuccess:
                    "An email with a link has been sent. Link valid for: {time}",
            },
        },
    },
    mail: {
        resetPassword: {
            title: "Password reset",
            text: "Password reset",
            button: "Reset password",
            exsited: "Link valid for: {time}",
        },
        activate: {
            title: "Account activation",
            text: "Account activation",
            button: "Activate account",
            exsited: "Link valid for: {time}",
        },
    },
};
