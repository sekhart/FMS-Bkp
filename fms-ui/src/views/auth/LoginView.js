import { Box, Button, Container, Link, makeStyles, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Page from "../../components/Page";
import { loginUser } from "../../features/user/LoginLogoutUserSlice";

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
                .max(20)
                .required("Username or Email is required"),
              password: Yup.string()
                .max(15)
                .required("Password is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              try {
                dispatch(loginUser(values))
                  .then((res) => {
                    if (typeof res !== "undefined") {
                      if (res.status === 401) {
                        alert(
                          " Your Username or Password is incorrect. Please try again!"
                        );
                      } else {
                        alert(
                          "  Sorry! Something went wrong. Please try again!"
                        );
                      }
                      setSubmitting(false);
                    }
                  })
                  .catch((err) => {
                    console.log("Dispatch error", err);
                  });
                // alert(JSON.stringify(values, null, 2));
                
              } catch (err) {
                console.error(err);
                setSubmitting(false);
              } finally {
                // setIsLoading(false);
              }
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
                  <Typography align="center" color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    align="center"
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Login with Username or Email
                  </Typography>
                </Box>
                <Box mt={3} mb={1}></Box>
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
