import {
    EMAIL_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
} from "../../form/constants";

export const uk = {
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
        forgotPasssword: {
            changePassword: {
                name: "Смена пароля",
                feedback: {
                    errors: {
                        timeout:
                            "Закончился срок действия ссылки восстановления! пройдите еще раз процедуру отправки",
                        notFound:
                            "Ссылка недействительна! пройдите еще раз процедуру отправки",
                    },
                },
            },
            name: "Забыли пароль?",
            feedback: {
                errors: {
                    alreadySent:
                        "Письмо с ссылкой на восстановление уже было отправлено. Время действия ссылки: {time}",
                },
                success:
                    "Письмо с ссылкой на восстановление отправлено. Время действия ссылки: {time}",
            },
        },
        notFound: {
            name: "404",
        },
    },
    api: {
        ERR_NETWORK: "Нет подключения к сети. Попробуйте позже.",
        FALLBACK_ERR: "Упс! Что-то пошло не так, попробуйте позже",
        FORBIDDEN: "Недостаточно прав",
        UNAUTHORIZED: "«Вы не авторизованы! войдите в аккаунт",
        NOT_FOUND: "«Контент не найдено",
        auth: "Ошибка аутентификации, перезагрузите страницу или войдите заново в аккаунт",
    },
    feedback: {
        empty: {
            title: "Тут пока что пусто",
        },
        error: {
            network: {
                title: "Упс!",
                subtitle: "Нет подключения к сети.",
                reload: "перезагрузить",
            },
            fallback: {
                title: "Упс!",
                subtitle: "Что-то пошло не так",
                reload: "перезагрузить",
            },
            forbidden: {
                title: "Упс!",
                subtitle: "Недостаточно прав",
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
    mail: {
        resetPassword: {
            title: "Восстановление пароля",
            text: "Восстановление пароля",
            button: "Восстановить пароль",
            exsited: "Время действия ссылки: {time}",
        },
    },
};

export type MessageStructure = typeof uk;
