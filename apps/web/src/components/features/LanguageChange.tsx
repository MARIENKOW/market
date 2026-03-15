"use client";

import { StyledFormControl } from "@/components/ui/StyledFormControl";
import { StyledMenuItem } from "@/components/ui/StyledMenuItem";
import { StyledSelect } from "@/components/ui/StyledSelect";
import { usePathname, useRouter } from "@/i18n/navigation";
import { SelectChangeEvent } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import {
    languages,
    AvailableLanguage,
    defaultLanguage,
} from "@myorg/shared/i18n";
import ReactCountryFlag from "react-country-flag";
import { useUserAuth } from "@/components/wrappers/auth/UserAuthProvider";
import UserService from "@/services/user/user.service";
import { $apiUserClient } from "@/utils/api/user/fetch.user.client";
import { StyledTooltip } from "@/components/ui/StyledTooltip";
import { useState, useTransition } from "react";
const userFetch = new UserService($apiUserClient);
export function LanguageChange() {
    const router = useRouter();
    const locale = useLocale();
    const [open, setOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const { user } = useUserAuth();
    const t = useTranslations();
    const [l, startTransition] = useTransition();

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        startTransition(() => setOpen(false));
        const value = event.target.value as AvailableLanguage;
        const lang = languages.includes(value) ? value : defaultLanguage;
        router.replace(pathname, { locale: lang });
        if (user) {
            try {
                userFetch.changeLocale({ locale: lang });
            } catch (error) {}
        }
    };

    if (languages.length <= 1) return null;

    return (
        <StyledTooltip title={open ? null : t("features.language.name")}>
            <StyledFormControl
                size="small"
                sx={{ display: "inline-block", minWidth: 0 }}
            >
                <StyledSelect
                    sx={{
                        width: "100%",
                        "& .MuiSelect-select": {
                            paddingTop: 0.5,
                            paddingBottom: 0.5,
                            paddingLeft: "8px !important",
                            paddingRight: "27x !important",
                        },
                        "& fieldset": { p: 0 },
                        "& svg": {
                            right: 3,
                        },
                    }}
                    onClick={() => setOpen((value) => !value)}
                    open={open}
                    defaultValue={locale}
                    onChange={handleChange}
                >
                    {languages.map((lang: string) => (
                        <StyledMenuItem key={lang} value={lang}>
                            {/* <ReactCountryFlag
                            svg
                            alt={lang}
                            style={{ width: "1.5em", height: "1.5em" }}
                            countryCode={lang === "en" ? "us" : lang}
                        /> */}
                            {lang}
                        </StyledMenuItem>
                    ))}
                </StyledSelect>
            </StyledFormControl>
        </StyledTooltip>
    );
}
