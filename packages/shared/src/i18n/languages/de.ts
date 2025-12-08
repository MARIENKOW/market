import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
} from "../../form/validateConfig";

export const de = {
    form: {
        password: {
            min: `mindestens ${PASSWORD_MIN_LENGTH} Zeichen`,
            max: `höchstens ${PASSWORD_MAX_LENGTH} Zeichen`,
            label: `Passwort`,
        },
        required: "Pflichtfeld",
        submit: "Absenden",
        signup: {
            name: "Registrieren",
            success: "Registrierung erfolgreich!",
        },
    },
    api: {
        ERR_NETWORK:
            "Keine Netzwerkverbindung. Bitte versuchen Sie es später erneut.",
        FALLBACK_ERR:
            "Hoppla! Etwas ist schiefgelaufen, bitte versuchen Sie es später erneut.",
    },
};
