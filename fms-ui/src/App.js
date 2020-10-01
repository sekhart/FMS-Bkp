import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { useRoutes } from "react-router-dom";

import GlobalStyles from "./components/GlobalStyles";
import CustomRoutes from "./Routes";
import Theme from "./theme";

import "../src/mixins/chartjs";
import "react-perfect-scrollbar/dist/css/styles.css";

const App = () => {
  const routing = useRoutes(CustomRoutes);
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
