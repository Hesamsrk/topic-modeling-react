import {ThemeProvider as MuiThemeProvider} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React, {createContext, useContext, useEffect, useMemo, useState,} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {createTheme} from "../theme";
import {Directions, getLangConfigs, Languages} from "../utils/langConfigs";
import i18n from "i18next";
import {CssBaseline} from "@mui/material";

interface SettingsContextInterface {
    collapsed: boolean;
    direction: Directions;
    language: Languages
    mode: string;
    open: boolean;
    changeCollapsed: (collapsed: boolean) => void;
    changeDirection: (direction: Directions) => void;
    changeLanguage: (language: Languages) => void;
    changeMode: (mode: string) => void;
    toggleDrawer: () => void;
}

export const SettingsContext = createContext({} as SettingsContextInterface);

type SettingsProviderProps = {
    children: React.ReactNode;
};

const SettingsProvider = ({children}: SettingsProviderProps) => {
    const [collapsed, setCollapsed] = useLocalStorage("sidebarcollapsed", false);
    const [direction, setDirection] = useLocalStorage<Directions>("direction", "ltr");
    const [language, setLanguage] = useLocalStorage<Languages>("language", "en");
    const [mode, setMode] = useLocalStorage("mode", "light");
    const [open, setOpen] = useState(false);


    useEffect(() => {
        document.body.dir = direction;
    }, [direction]);

    useEffect(() => {
        i18n.changeLanguage(language).then(_ => console.log("language changed to:", i18n.language));
        setDirection(getLangConfigs(language).direction)
    }, [language, setDirection])

    const theme = useMemo(
        () => createTheme(direction as Directions, mode as "dark" | "light", language as Languages),
        [direction, mode, language]
    );

    const changeCollapsed = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };

    const changeLanguage = (language: Languages) => {
        setLanguage(language);
    };

    const changeDirection = (direction: Directions) => {
        if (direction) {
            setDirection(direction);
        }
    };

    const changeMode = (mode: string) => {
        if (mode) {
            setMode(mode);
        }
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <SettingsContext.Provider
            value={{
                collapsed,
                direction,
                language,
                mode,
                open,
                changeCollapsed,
                changeDirection,
                changeLanguage,
                changeMode,
                toggleDrawer,
            }}
        >
            <MuiThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CssBaseline enableColorScheme />
                    {children}
                </LocalizationProvider>
            </MuiThemeProvider>
        </SettingsContext.Provider>
    );
};

export function useSettings() {
    return useContext(SettingsContext);
}

export default SettingsProvider;
