import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import {Close} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {drawerWidth} from "../config/layout";
import {useSettings} from "../contexts/SettingsProvider";
import React from "react";
import {Languages} from "../utils/langConfigs";

type SettingsDrawerProps = {
    onDrawerToggle: () => void;
    open: boolean;
};

const SettingsDrawer = ({onDrawerToggle, open}: SettingsDrawerProps) => {
    const {
        changeCollapsed,
        changeLanguage,
        changeMode,
        collapsed,
        language,
        mode,
    } = useSettings();
    const { t} = useTranslation();
    console.log({language})

    const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeLanguage((event.target as HTMLInputElement).value as Languages);
    };

    const handleModeChange = (_: any, mode: string) => {
        changeMode(mode);
    };

    const handleSidebarChange = (_: any, collapsed: boolean) => {
        changeCollapsed(collapsed);
    };


    return (
        <Drawer
            anchor="top"
            open={open}
            onClose={onDrawerToggle}
            sx={{
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    height: "100%"
                },
            }}
            variant="temporary"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                }}

            >
                <Typography variant="h5">{t("settings.drawer.title")}</Typography>
                <IconButton color="inherit" onClick={onDrawerToggle} edge="end">
                    <Close/>
                </IconButton>
            </Box>
            <Box sx={{p: 2}}>
                <Typography
                    gutterBottom
                    id="settings-language"
                    marginTop={3}
                    variant="h6"
                >
                    {t("settings.drawer.language.label")}
                </Typography>
                <FormControl>
                    <RadioGroup
                        aria-label="language"
                        name="language-radio-group"
                        onChange={handleLanguageChange}
                        value={language}
                    >
                        <FormControlLabel
                            value="en"
                            control={<Radio/>}
                            label={t<string>("settings.drawer.language.options.en")}
                        />
                        <FormControlLabel
                            value="fa"
                            control={<Radio/>}
                            label={t<string>("settings.drawer.language.options.fa")}
                        />
                    </RadioGroup>
                </FormControl>
                <Typography gutterBottom id="settings-mode" marginTop={3} variant="h6">
                    {t("settings.drawer.mode.label")}
                </Typography>
                <ToggleButtonGroup
                    color="primary"
                    value={mode}
                    exclusive
                    fullWidth
                    onChange={handleModeChange}
                >
                    <ToggleButton value="light">
                        {t("settings.drawer.mode.options.light")}
                    </ToggleButton>
                    <ToggleButton value="dark">
                        {t("settings.drawer.mode.options.dark")}
                    </ToggleButton>
                </ToggleButtonGroup>
                <Typography
                    gutterBottom
                    id="settings-sidebar"
                    marginTop={3}
                    variant="h6"
                >
                    {t("settings.drawer.sidebar.label")}
                </Typography>
                <ToggleButtonGroup
                    color="primary"
                    value={collapsed}
                    exclusive
                    fullWidth
                    onChange={handleSidebarChange}
                >
                    <ToggleButton value={true}>
                        {t("settings.drawer.sidebar.options.collapsed")}
                    </ToggleButton>
                    <ToggleButton value={false}>
                        {t("settings.drawer.sidebar.options.full")}
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Drawer>
    );
};

export default SettingsDrawer;
