"use client";

import ErrorElement from "@/components/feedback/ErrorElement";
import Error from "next/error";

export default function ErrorPage({ error }: { error: Error }) {
    console.log(error);
    return <ErrorElement />;
}
