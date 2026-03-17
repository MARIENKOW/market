"use client";

import { EVENTS_KEYS } from "@/helpers/event.helper";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

export const EventListener = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const onUnauthorized = () => {
            console.log(EVENTS_KEYS.UNAUTHORIZED);
            startTransition(() => router.refresh());
        };

        window.addEventListener(EVENTS_KEYS.UNAUTHORIZED, onUnauthorized);

        return () => {
            window.removeEventListener(
                EVENTS_KEYS.UNAUTHORIZED,
                onUnauthorized,
            );
        };
    }, [router]);

    return null;
};
