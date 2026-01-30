import AuthErrorElement from "@/components/feedback/error/AuthErrorElement";
import ErrorElement from "@/components/feedback/error/ErrorElement";
import ForbiddenErrorElement from "@/components/feedback/error/ForbiddenErrorElement";
import NetworkErrorElement from "@/components/feedback/error/NetworkErrorElement";
import NotFoundElement from "@/components/feedback/NotFoundElement";
import {
    isApiErrorResponse,
    isBadRequestError,
    isForbiddenError,
    isInternalServerError,
    isNetworkError,
    isNotFoundError,
    isUnuathorizedError,
    isValidationFailedError,
} from "@/helpers/error/error.type.helper";
import { ApiErrorResponse, FieldsErrors } from "@myorg/shared/dto";
import { MessageKeyType } from "@myorg/shared/i18n";
import { useTranslations } from "next-intl";

type FallbackElement = {
    element?: React.ComponentType;
    message?: MessageKeyType;
};
type Fallback = {
    root?: FallbackElement;
    notFound?: FallbackElement;
    forbidden?: FallbackElement;
    network?: FallbackElement;
    unauthorized?: FallbackElement;
    validation?: FallbackElement;
};

export default function ErrorHandlerElement({
    error,
    fallback,
}: {
    error: unknown;
    fallback?: Fallback;
}) {
    const t = useTranslations();
    console.log(error);
    if (!isApiErrorResponse(error)) {
        const Component = fallback?.root?.element ?? ErrorElement;
        return <Component message={fallback?.root?.message} />;
    }

    const apiError = error as ApiErrorResponse;

    if (isNetworkError(apiError)) {
        const Component = fallback?.network?.element ?? NetworkErrorElement;
        return <Component message={fallback?.network?.message} />;
    }

    if (isBadRequestError(apiError)) {
        if (isValidationFailedError(apiError)) {
            const fieldsErrors = apiError.data as FieldsErrors;
            const message =
                fallback?.validation?.message || fieldsErrors?.root?.[0];
            const Component = fallback?.validation?.element ?? ErrorElement;
            return <Component message={message ? t(message) : ""} />;
        }
    }
    if (isUnuathorizedError(apiError)) {
        const Component = fallback?.unauthorized?.element ?? AuthErrorElement;
        return <Component message={fallback?.unauthorized?.message} />;
    }
    if (isForbiddenError(apiError)) {
        const Component = fallback?.forbidden?.element ?? ForbiddenErrorElement;
        return <Component message={fallback?.forbidden?.message} />;
    }

    if (isNotFoundError(apiError)) {
        const Component = fallback?.notFound?.element ?? NotFoundElement;
        return <Component message={fallback?.notFound?.message} />;
    }

    if (isInternalServerError(apiError)) {
        const Component = fallback?.root?.element ?? ErrorElement;
        return <Component message={fallback?.root?.message} />;
    }

    const Component = fallback?.root?.element ?? ErrorElement;
    return <Component message={fallback?.root?.message} />;
}
