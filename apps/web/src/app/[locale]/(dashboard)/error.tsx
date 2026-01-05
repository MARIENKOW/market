"use client";

import ErrorElement from "@/components/feedback/ErrorElement";
import { useTransition } from "react";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    // const [isPending, startTransition] = useTransition();
    return <ErrorElement message={error.message} />;
}
