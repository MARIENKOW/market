import {
    EMAIL_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    CODE_LENGTH,
} from "../../form/constants";

export const ru = {
    form: {
        password: {
            min: `минимум ${PASSWORD_MIN_LENGTH} символов`,
            max: `максимум ${PASSWORD_MAX_LENGTH} символов`,
            invalid: `Неправильный пароль`,
            label: `Пароль`,
        },
        currentPassword: {
            min: `минимум ${PASSWORD_MIN_LENGTH} символов`,
            max: `максимум ${PASSWORD_MAX_LENGTH} символов`,
            invalid: `Неправильный пароль`,
            label: `Текущий Пароль`,
        },
        newPassword: {
            min: `минимум ${PASSWORD_MIN_LENGTH} символов`,
            max: `максимум ${PASSWORD_MAX_LENGTH} символов`,
            sameAsCurrent: "Новый пароль совпадает с текущим",
            label: `Новый пароль`,
        },
        code: {
            length: `Код должен содержать ${CODE_LENGTH} цифр`,
            digits: "Только цифры",
            label: "Код подтверждения",
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
            min: `минимум ${PASSWORD_MIN_LENGTH} символов`,
            max: `максимум ${PASSWORD_MAX_LENGTH} символов`,
        },
        required: "обязательное поле",
        submit: "Подтвердить",
    },
    pages: {
        main: {
            name: "Главная",
        },
        register: {
            name: "Регистрация",
            feedback: {
                success: {
                    registerSuccess: "Регистрация успешна!",
                    mailSend:
                        "Регистрация успешна!. Ссылка для активации была отправлена на почту. Время действия: {time}",
                },
            },
            login: "Уже есть аккаунт?",
        },
        login: {
            name: "Вход",
            feedback: {
                success: {
                    loginSuccess: "Авторизация успешна!",
                },
                errors: {
                    notActive: "Аккаунт не активирован.",
                    passwordNotFound: `Пароль не задано! Нажмите: "{btn}"`,
                    sendMail:
                        "Аккаунт не активирован. Отправьте письмо для активации",
                    expire: "Аккаунт не активирован. Время действия ссылки активации истекло. Отпраьте новое письмо",
                    alreadySend:
                        "Аккаунт не активирован. Письмо для активации было отправлено на почту. Время действия: {time}",
                },
            },
            register: "Нет аккаунта?",
        },
        admin: {
            name: "Главная",
            settings: { name: "Настройки" },
            login: {
                name: "Вход",
                feedback: {
                    success: {
                        loginSuccess: "Авторизация успешна!",
                    },
                },
            },
            forgotPassword: {
                changePassword: {
                    name: "Смена пароля",
                    feedback: {
                        success: {
                            changeSuccess: "Смена пароля успешна!",
                        },
                        errors: {
                            timeout:
                                "Закончился срок действия ссылки восстановления! пройдите еще раз процедуру отправки",
                            notFound:
                                "Ссылка недействительна! пройдите еще раз процедуру отправки",
                        },
                    },
                },
                name: "Забыли пароль?",
                login: "Вернуться ко входу",
                feedback: {
                    errors: {
                        alreadySent:
                            "Письмо с ссылкой на восстановление уже было отправлено. Время действия ссылки: {time}",
                    },
                    success:
                        "Письмо с ссылкой на восстановление отправлено. Время действия ссылки: {time}",
                },
            },
        },

        activate: {
            feedback: {
                success: {
                    accountActivate: "Аккаунт успешно активирован.",
                },
                errors: {
                    notValid: "Ссылка недействительна!",
                    expired: "Вышло время действия ссылки",
                },
            },
        },
        forgotPassword: {
            changePassword: {
                name: "Смена пароля",
                feedback: {
                    success: {
                        changeSuccess: "Смена пароля успешна!",
                    },
                    errors: {
                        timeout:
                            "Закончился срок действия ссылки восстановления! пройдите еще раз процедуру отправки",
                        notFound:
                            "Ссылка недействительна! пройдите еще раз процедуру отправки",
                    },
                },
            },
            name: "Забыли пароль?",
            login: "Вернуться ко входу",
            feedback: {
                errors: {
                    alreadySent:
                        "Письмо с ссылкой на восстановление уже было отправлено. Время действия ссылки: {time}",
                },
                success:
                    "Письмо с ссылкой на восстановление отправлено. Время действия ссылки: {time}",
            },
        },
        profile: {
            name: "Мой аккаунт",
            settings: {
                name: "Настройки",
                groups: {
                    account: "Аккаунт",
                    other: "Прочее",
                },
                profile: {
                    name: "Профиль",
                },
                password: {
                    name: "Пароль",
                    subtitle: "Потребуется подтверждение по email",
                    resend: "Отправить повторно",
                    step1: "Введите пароли",
                    step2: "Подтвердите по email",
                    step3: "Готово",
                    resendIn: "Повторно через {seconds}с",
                    hint: "Код отправлен на {email}",
                    back: "Назад",
                    cancel: "Отменить смену пароля",
                    success: {
                        title: "Пароль изменён",
                        subtitle:
                            "Все активные сессии завершены. Используйте новый пароль для входа.",
                        name: "Готово",
                    },
                },
                sessions: {
                    name: "Сессии",
                },
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
        UNAUTHORIZED: "Вы не авторизованы! войдите в аккаунт",
        NOT_FOUND: "Ошибка 404",
        ABORT_ERROR: "Запрос отменено",
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
            resetToken: {
                title: "Упс!",
                subtitle: "Что-то пошло не так",
            },
            activate: {
                title: "Упс!",
                subtitle: "Что-то пошло не так",
                reload: "отправить письмо",
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
            unauthorized: {
                title: "Упс!",
                subtitle: "вы не авторизованы",
                reload: "Запросить данные заново",
            },
        },
    },
    features: {
        theme: {
            name: "Тема",
        },
        language: {
            name: "Язык",
        },
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
        activate: {
            name: "Отправить письмо",
            error: {
                alreadySend:
                    "Письмо с ссылкой уже было отправлено на почту. Время действия ссылки: {time}",
                alreadyActive: "Пользователь уже активирован",
            },
            success: {
                sendSuccess:
                    "Письмо с ссылкой было отправлено на почту. Время действия ссылки: {time}",
            },
        },
    },
    mail: {
        resetPassword: {
            title: "Восстановление пароля",
            text: "Восстановление пароля",
            button: "Восстановить пароль",
            exsited: "Время действия ссылки: {time}",
        },
        activate: {
            title: "Активация аккаунта",
            text: "Активация аккаунта",
            button: "Активировать аккаунт",
            exsited: "Время действия ссылки: {time}",
        },
    },
};

export type MessageStructure = typeof ru;
