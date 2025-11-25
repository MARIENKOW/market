import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
} from "@myorg/shared/form/validateConfig";

export const ru = {
    form: {
        password: {
            min: `минимум ${PASSWORD_MIN_LENGTH} символов`,
            max: `максимум ${PASSWORD_MAX_LENGTH} символов`,
            label: `Пароль`,
        },
        required: "обязательное поле",
        submit: "Подтвердить",
        signup: {
            name: "Регистрация",
            success: "Регистрация успешна!",
        },
    },
    api: {
        ERR_NETWORK: "Нет подключения к сети. Попробуйте позже.",
        FALLBACK_ERR: "Упс! Что-то пошло не так, попробуйте позже",
    },
};
