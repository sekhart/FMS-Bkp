import { AppBar, Badge, Box, Hidden, IconButton, makeStyles, Toolbar, Tooltip } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import Logo from "../../components/Logo";
import { logoutUser } from "../../features/user/LoginLogoutUserSlice";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <Tooltip title="Farmer Management System" placement="right" arrow>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Tooltip>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <Tooltip title="Notifications" arrow>
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout" arrow>
            <IconButton
              color="inherit"
              onClick={() => {
                dispatch(logoutUser());
                navigate("/login", { replace: true });
              }}
            >
              <InputIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
