import { Box, Button, Container, Grid, Link, makeStyles, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Page from "../../components/Page";
import { ACCESS_TOKEN } from "../../constants";
import { loginUser } from "../../features/user/LoginLogoutUserSlice";
import FacebookIcon from "../../icons/Facebook";
import GoogleIcon from "../../icons/Google";
import { login } from "../../utils/APIUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/app/dashboard", { replace: true });
    }
  }, [user]);

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              usernameOrEmail: "sekhartsr@gmail.com",
              password: "Password123",
            }}
            validationSchema={Yup.object().shape({
              usernameOrEmail: Yup.string()
                .max(255)
                .required("Username or Email is required"),
              password: Yup.string()
                .max(255)
                .required("Password is required"),
            })}
            onSubmit={(values) => {
              dispatch(loginUser(values));
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={3} mb={1}>
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with Username/Email
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(
                    touched.usernameOrEmail && errors.usernameOrEmail
                  )}
                  fullWidth
                  helperText={touched.usernameOrEmail && errors.usernameOrEmail}
                  label="Email or Username"
                  margin="normal"
                  name="usernameOrEmail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.usernameOrEmail}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
