"use client";

import ErrorElement from "@/components/feedback/error/ErrorElement";
import ForbiddenErrorElement from "@/components/feedback/error/ForbiddenErrorElement";
import NetworkErrorElement from "@/components/feedback/error/NetworkErrorElement";
import UnauthorizedErrorElement from "@/components/feedback/error/UnauthorizedErrorElement";
import NotFoundElement from "@/components/feedback/NotFoundElement";
import {
    ErrorNormalizeContext,
    getErrorContext,
} from "@/helpers/error/error.type.helper";
import { ApiErrorResponse, ErrorsWithMessages } from "@myorg/shared/dto";

type FallbackElement = {
    element?: React.ReactNode;
    message?: string;
};
type Fallback = {
    [K in ErrorNormalizeContext]?: FallbackElement;
};

export default function ErrorHandlerElement({
    error,
    fallback,
}: {
    error: unknown;
    fallback?: Fallback;
}): React.ReactNode {
    console.log(error);
    const context = getErrorContext(error);
    const options = fallback?.[context];
    if (options?.element) return options.element;
    const message = options?.message;
    if (context === "cancel") {
        return <ErrorElement message={message} />;
    }
    if (context === "forbidden") {
        return <ForbiddenErrorElement message={message} />;
    }
    if (context === "internal") {
        return <ErrorElement message={message} />;
    }
    if (context === "network") {
        return <NetworkErrorElement message={message} />;
    }
    if (context === "notfound") {
        return <NotFoundElement message={message} />;
    }
    if (context === "unauthorized") {
        return <UnauthorizedErrorElement message={message} />;
    }
    if (context === "validation") {
        const apiError = error as ApiErrorResponse;
        const { root } = apiError.data as ErrorsWithMessages;
        return <ErrorElement message={message || root?.[0]?.message} />;
    }
    if (context === "unknown") {
        return <ErrorElement message={message} />;
    }
}
