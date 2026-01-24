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
            invalid: `Неправильный пароль`,
            label: `Пароль`,
        },
        email: {
            max: `максимум ${EMAIL_MAX_LENGTH} символов`,
            invalid: `некорректный формат почты`,
            notFound: `почта не найдена`,
            unique: `email должен быть уникальным`,
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
        register: {
            success: "Регистрация успешна!",
        },
        login: {
            success: "Авторизация успешна!",
        },
    },
    pages: {
        main: {
            name: "Главная",
        },
        register: {
            name: "Регистрация",
        },
        login: {
            name: "Авторизация",
        },
        notFound: {
            name: "404",
        },
    },
    api: {
        ERR_NETWORK: "Нет подключения к сети. Попробуйте позже.",
        FALLBACK_ERR: "Упс! Что-то пошло не так, попробуйте позже",
        FORBIDDEN: "Недостаточно прав",
        auth: "Ошибка аутентификации, перезагрузите страницу или войдите заново в аккаунт",
    },
    feedback: {
        empty: {
            title: "Тут пока что пусто",
        },
        error: {
            fallback: {
                title: "Упс!",
                subtitle: "Что-то пошло не так",
                reload: "перезагрузить",
            },
            auth: {
                title: "Упс!",
                subtitle: "Не удалось провести аутентификацию",
                reload: "Запросить данные заново",
            },
        },
    },
    features: {
        logout: {
            name: "Выйти",
            error: "Не удалось выйти с аккаунта! Попробуйте позже",
            success: "Вы удачно вышли с аккаунта",
        },
        logoutErr: {
            name: "Сбросить сессию",
            error: "Не удалось сбросить сессию! Попробуйте позже",
            success: "Вы удачно сбросили сессию",
        },
    },
};

export type MessageStructure = typeof ua;
