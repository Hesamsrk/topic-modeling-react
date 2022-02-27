import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
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
        changeDirection,
        changeLanguage,
        changeMode,
        collapsed,
        direction,
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
                    <CloseIcon/>
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
                            label={t("settings.drawer.language.options.en")}
                        />
                        <FormControlLabel
                            value="fa"
                            control={<Radio/>}
                            label={t("settings.drawer.language.options.fa")}
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
