import { MessageStructure } from "./ua";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../../form/constants";

export const en: MessageStructure = {
    form: {
        password: {
            min: `minimum ${PASSWORD_MIN_LENGTH} characters`,
            max: `maximum ${PASSWORD_MAX_LENGTH} characters`,
            label: `Password`,
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
        notFound: {
            name: "404",
        },
    },
    api: {
        ERR_NETWORK: "No network connection. Please try again later.",
        FALLBACK_ERR: "Oops! Something went wrong, please try again later.",
    },
};
