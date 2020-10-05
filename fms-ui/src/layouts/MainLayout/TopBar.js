import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import Logo from "../../components/Logo";

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64,
  },
});

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.user);
  // const navigate = useNavigate();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        {user && (
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        )}
        {!user && (
          <p >
            <Logo />
          </p>
        )}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
