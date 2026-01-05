"use client";

import ErrorElement from "@/components/feedback/ErrorElement";
import Error from "next/error";

export default function ErrorPage({
    error,
    reload,
}: {
    error: Error;
    reload: () => void;
}) {
    console.dir(error);
    console.log(reload);
    return <ErrorElement  />;
}
