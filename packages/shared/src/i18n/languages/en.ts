import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
} from "@myorg/shared/form/validateConfig";

export const en = {
    form: {
        password: {
            min: `minimum ${PASSWORD_MIN_LENGTH} characters`,
            max: `maximum ${PASSWORD_MAX_LENGTH} characters`,
            label: `Password`,
        },
        required: "required field",
        submit: "Submit",
        signup: {
            name: "SignUp",
            success: "SignUp success!",
        },
    },
    api: {
        ERR_NETWORK: "No network connection. Please try again later.",
        FALLBACK_ERR: "Oops! Something went wrong, please try again later.",
    },
};
