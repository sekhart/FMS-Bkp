import { Box, Button, Checkbox, Container, FormHelperText, Link, makeStyles, Snackbar, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Formik } from "formik";
import { values } from "lodash";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import LoadingIndicator from "../../components/LoadingIndicator";
import Page from "../../components/Page";
import { signup } from "../../utils/APIUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const roles = [
  {
    value: "ROLE_USER",
    label: "User",
  },
  {
    value: "ROLE_ADMIN",
    label: "Admin",
  },
];

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
        <Snackbar open={open} autoHideDuration={100000}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
           User Registered Successfully! — <strong>Please continue to Login!</strong>
          </Alert>
        </Snackbar>
      <Page className={classes.root} title="Register">
        <Box
          display="flex"
          flexDirection="column"
          height="120%"
          justifyContent="center"
        >
          <div>{isLoading && <LoadingIndicator />}</div>
          <Container maxWidth="md">
            <Formik
              initialValues={{
                email: "",
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                passwordConfirmation: "",
                phone: "",
                role: "",
                address: "",
                policy: false,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                firstName: Yup.string()
                  .max(255)
                  .required("First name is required"),
                lastName: Yup.string()
                  .max(255)
                  .required("Last name is required"),
                username: Yup.string()
                  .max(255)
                  .required("Username is required"),
                password: Yup.string()
                  .max(15)
                  .required("password is required")
                  .min(6, "Password must be at least 6 characters"),
                passwordConfirmation: Yup.string().oneOf(
                  [Yup.ref("password"), null],
                  "Passwords must match"
                ),
                phone: Yup.string().matches(
                  rePhoneNumber,
                  "Phone number is not valid"
                ),
                role: Yup.string()
                  .ensure()
                  .required("Role is required!"),
                address: Yup.string()
                  .max(255)
                  .required("Address is required"),
                policy: Yup.boolean().oneOf(
                  [true],
                  "This field must be checked"
                ),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setIsLoading(true);
                signup(values)
                  .then((response) => {
                    // alert(JSON.stringify(response, null, 2));
                    setIsLoading(false);
                    setOpen(true)
                    navigate("/login", { replace: true });
                  })
                  .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                  });
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={1}>
                    <Typography color="textPrimary" variant="h2">
                      Create new account
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Use your email to create new account
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        label="First name"
                        margin="normal"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label="Last name"
                        margin="normal"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.username && errors.username)}
                        fullWidth
                        helperText={touched.username && errors.username}
                        label="Username"
                        margin="normal"
                        name="username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.username}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
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
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(
                          touched.passwordConfirmation &&
                            errors.passwordConfirmation
                        )}
                        fullWidth
                        helperText={
                          touched.passwordConfirmation &&
                          errors.passwordConfirmation
                        }
                        label="Confirm Password"
                        margin="normal"
                        name="passwordConfirmation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.passwordConfirmation}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.phone && errors.phone)}
                        fullWidth
                        helperText={touched.phone && errors.phone}
                        label="Phone Number"
                        margin="normal"
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.role && errors.role)}
                        fullWidth
                        helperText={touched.role && errors.role}
                        label="Select Role"
                        name="role"
                        onChange={handleChange}
                        required
                        select
                        SelectProps={{ native: true }}
                        value={values.role}
                        variant="outlined"
                      >
                        {roles.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.address && errors.address)}
                        fullWidth
                        helperText={touched.address && errors.address}
                        label="Address"
                        margin="normal"
                        name="address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        variant="outlined"
                        multiline
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                  <Box alignItems="center" display="flex" ml={-1}>
                    <Checkbox
                      checked={values.policy}
                      name="policy"
                      onChange={handleChange}
                    />
                    <Typography color="textSecondary" variant="body1">
                      I have read the{" "}
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="#"
                        underline="always"
                        variant="h6"
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </Box>
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>{errors.policy}</FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign up now
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Have an account?{" "}
                    <Link component={RouterLink} to="/login" variant="h6">
                      Sign in
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Page>
    </div>
  );
};

export default RegisterView;
