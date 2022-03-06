import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Empty from "../../core/components/Empty";
import Loader from "../../core/components/Loader";
import Result from "../../core/components/Result";
import { useDateLocale } from "../../core/hooks/useDateLocale";
import { notificationKeys } from "../config/notification";
import { useNotifications } from "../hooks/useNotifications";

const RecentNotifications = () => {
  const locale = useDateLocale();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data, isError, isLoading } = useNotifications();

  const open = Boolean(anchorEl);

  const unreadCount = useMemo(
    () => data && data.filter((notification) => notification.unread).length,
    [data]
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        id="notifications-button"
        aria-controls="notifications-popover"
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"}
        aria-label="show recent notifications"
        color="inherit"
        onClick={handleClick}
      >
        <Badge color="error" variant="dot" invisible={!unreadCount}>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id="notifications-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ width: 360 }}>
          {!isLoading && !isError && data && data.length > 0 && (
            <List
              component="nav"
              aria-label="notifications popover"
              sx={{ px: 2 }}
            >
              {data.map((notification) => (
                <ListItem
                  button
                  component={NavLink}
                  key={notification.id}
                  to={""}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Trans
                        components={{ bold: <strong /> }}
                        defaults="<bold>{{ user }}</bold> did someting <bold>{{ quantity }}</bold> times"
                        i18nKey={notificationKeys[notification.code]}
                        values={notification.params}
                      />
                    }
                    secondary={formatDistanceToNow(
                      new Date(notification.createdAt),
                      { addSuffix: true, locale }
                    )}
                  />
                </ListItem>
              ))}
            </List>
          )}
          {!isLoading && !isError && (!data || data.length === 0) && (
            <Empty title={t("admin.header.notifications.empty.title")} />
          )}
          {isError && (
            <Result
              status="error"
              subTitle={t("common.errors.unexpected.subTitle")}
              title={t("common.errors.unexpected.title")}
            />
          )}
          {isLoading && <Loader />}
          <Box sx={{ px: 2, pb: 2 }}>
            <Button
              color="secondary"
              fullWidth
              sx={{ bgcolor: "background.default" }}
              variant="contained"
            >
              {t("admin.header.notifications.seeAll")}
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default RecentNotifications;
