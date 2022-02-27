import {Locale} from "date-fns";
import en from "date-fns/locale/en-US";
import fa from "date-fns/locale/fa-IR";
import {useEffect, useState} from "react";
import {useSettings} from "../contexts/SettingsProvider";

const locales: { [key: string]: Locale } = {en, fa};

export function useDateLocale(): Locale | undefined {
    const [locale, setLocale] = useState<Locale | undefined>(undefined);
    const {language} = useSettings();

    useEffect(() => {
        setLocale(locales[language]);
    }, [language]);

    return locale;
}
