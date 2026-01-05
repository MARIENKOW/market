"use client";

import { StyledFormControl } from "@/components/ui/StyledFormControl";
import { StyledMenuItem } from "@/components/ui/StyledMenuItem";
import { StyledSelect } from "@/components/ui/StyledSelect";
import { usePathname, useRouter } from "@/i18n/navigation";
import { SelectChangeEvent } from "@mui/material";
import { useLocale } from "next-intl";
import {
    languages,
    AvailableLanguage,
    defaultLanguage,
} from "@myorg/shared/i18n";
import ReactCountryFlag from "react-country-flag";
export function LanguageChange() {
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        const value = event.target.value as AvailableLanguage;
        const lang = languages.includes(value) ? value : defaultLanguage;
        router.replace(pathname, { locale: lang });
    };

    if (languages.length <= 1) return null;

    return (
        <StyledFormControl
            size="small"
            sx={{ display: "inline-block", minWidth: 70 }}
        >
            <StyledSelect
                sx={{ width: "100%" }}
                defaultValue={locale}
                onChange={handleChange}
            >
                {languages.map((lang:string) => (
                    <StyledMenuItem key={lang} value={lang}>
                        <ReactCountryFlag
                            svg
                            style={{ width: "1.5em", height: "1.5em" }}
                            countryCode={lang === "en" ? "us" : lang}
                        />
                    </StyledMenuItem>
                ))}
            </StyledSelect>
        </StyledFormControl>
    );
}
