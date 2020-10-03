import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import _ from 'lodash';
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

const user = {
  avatar: "/static/images/avatars/sekhar_1.png",
 
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const { userProfile } = useSelector((state) => state.userProfile);

  const { firstName, lastName, userName, email, phone, address } = userProfile;
  const name = _.startCase(firstName) + " " + _.startCase(lastName);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={user.avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${_.startCase(address)}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${email}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
