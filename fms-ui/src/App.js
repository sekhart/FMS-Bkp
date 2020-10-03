import { ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useRoutes } from "react-router-dom";

import GlobalStyles from "./components/GlobalStyles";
import CustomRoutes from "./Routes";
import Theme from "./theme";

import "../src/mixins/chartjs";
import "react-perfect-scrollbar/dist/css/styles.css";

const App = () => {
  const routing = useRoutes(CustomRoutes);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
