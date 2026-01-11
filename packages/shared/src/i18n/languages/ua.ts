import {
    EMAIL_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
} from "../../form/constants";

export const ua = {
    form: {
        password: {
            min: `минимум ${PASSWORD_MIN_LENGTH} символов`,
            max: `максимум ${PASSWORD_MAX_LENGTH} символов`,
            label: `Пароль`,
        },
        email: {
            max: `максимум ${EMAIL_MAX_LENGTH} символов`,
            invalid: `некорректный формат почты`,
            label: `Почта`,
        },
        rePassword: {
            label: `Пароль повторно`,
            same: "Пароли не совпадают",
        },
        username: {
            min: `минимум ${USERNAME_MIN_LENGTH} символов`,
            max: `максимум ${USERNAME_MAX_LENGTH} символов`,
            label: `Логин`,
        },
        required: "обязательное поле",
        submit: "Подтвердить",
        signup: {
            success: "Регистрация успешна!",
        },
    },
    pages: {
        main: {
            name: "Главная",
        },
        signup: {
            name: "Регистрация",
        },
        signin: {
            name: "Авторизация",
        },
        notFound: {
            name: "404",
        },
    },
    api: {
        ERR_NETWORK: "Нет подключения к сети. Попробуйте позже.",
        FALLBACK_ERR: "Упс! Что-то пошло не так, попробуйте позже",
    },
    feedback: {
        empty: {
            title: "Тут пока что пусто",
        },
        error: {
            title: "Упс!",
            subtitle: "Что-то пошло не так",
            reload: "перезагрузить",
        },
    },
    features: {
        signOut: {
            name: "Выйти",
        },
    },
};

export type MessageStructure = typeof ua;
