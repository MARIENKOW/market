import { MessageStructure } from "./ua";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../../form/constants";

export const de: MessageStructure = {
    form: {
        password: {
            min: `mindestens ${PASSWORD_MIN_LENGTH} Zeichen`,
            max: `maximal ${PASSWORD_MAX_LENGTH} Zeichen`,
            label: `Passwort`,
        },
        required: "Pflichtfeld",
        submit: "Bestätigen",
        signup: {
            success: "Registrierung erfolgreich!",
        },
    },
    pages: {
        main: {
            name: "Startseite",
        },
        signup: {
            name: "Registrierung",
        },
        notFound: {
            name: "404",
        },
    },
    api: {
        ERR_NETWORK:
            "Keine Netzwerkverbindung. Bitte versuchen Sie es später erneut.",
        FALLBACK_ERR:
            "Ups! Etwas ist schiefgelaufen, bitte versuchen Sie es später erneut.",
    },
};
