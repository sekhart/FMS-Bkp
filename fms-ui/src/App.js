import { ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

import GlobalStyles from "./components/GlobalStyles";
import IdleTimerContainer from "./components/IdleTimerContainer";
import { fetchUserProfile } from "./features/user/UserProfileSlice";
import CustomRoutes from "./Routes";
import Theme from "./theme";

import "../src/mixins/chartjs";
import "react-perfect-scrollbar/dist/css/styles.css";

const App = () => {
  const routing = useRoutes(CustomRoutes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const path = location.pathname;
    if (path !== "/register") {
      if (!user) {
        navigate("/login", { replace: true });
      } else {
        dispatch(fetchUserProfile(user));
      }
    }
  }, [user, navigate, dispatch]);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <IdleTimerContainer />
      {routing}
    </ThemeProvider>
  );
};

export default App;
