import { z } from "zod";
import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 30;

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                form: {
                    password: {
                        min: `minimum ${PASSWORD_MIN_LENGTH} characters`,
                        max: `maximum ${PASSWORD_MAX_LENGTH} characters`,
                        label: `Password`,
                    },
                    required: "required field",
                    submit: "Submit",
                },
            },
        },
        ru: {
            translation: {
                form: {
                    password: {
                        min: `минимум ${PASSWORD_MIN_LENGTH} символов`,
                        max: `максимум ${PASSWORD_MAX_LENGTH} символов`,
                        label: `Пароль`,
                    },
                    required: "обязательное поле",
                    submit: "Подтвердить",
                },
            },
        },
    },
    lng: "ru",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;

export const Password = z
    .string()
    .nonempty(t("form.required"))
    .min(PASSWORD_MIN_LENGTH, t("form.password.min"))
    .max(PASSWORD_MAX_LENGTH, t("form.password.max"));

export const UserSignUpSchema = z.object({
    password: Password,
});

export type UserSignUpDto = z.infer<typeof UserSignUpSchema>;
