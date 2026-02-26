'use client'

import { useRouter } from "@/i18n/navigation";
import { FULL_PATH_ROUTE } from "@myorg/shared/route";
import { useEffect, useRef } from "react";

export default function NotFoundActivateError() {
    const router = useRouter();
    const firstRender = useRef<boolean>(false);
    useEffect(() => {
        if (firstRender.current) return;
        firstRender.current = true;
        router.push(FULL_PATH_ROUTE.path);
    }, [router]);
    return null;
}
