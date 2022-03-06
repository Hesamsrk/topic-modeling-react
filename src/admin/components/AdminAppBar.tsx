import {AppBar} from "@mui/material";
import {drawerCollapsedWidth, drawerWidth} from "../../core/config/layout";
import {useSettings} from "../../core/contexts/SettingsProvider";
import {ReactNode} from "react";

type AdminAppBarProps = {
    children: ReactNode;
};

const AdminAppBar = ({children}: AdminAppBarProps) => {
    const {collapsed,direction} = useSettings();
    const width = collapsed ? drawerCollapsedWidth : drawerWidth;
    const fixAppbar = direction === "rtl" ? {
        left: 0,
        right: "auto"
    } as const : {}
    return (
        <AppBar
            color="default"
            position="fixed"
            sx={[
                {
                    width: {lg: `calc(100% - ${width}px)`},
                    marginInlineStart: {lg: width},

                },
                fixAppbar
            ]}
        >
            {children}
        </AppBar>
    );
};

export default AdminAppBar;
