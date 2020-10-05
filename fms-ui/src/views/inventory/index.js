import { Box, Container, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

import Page from "../../components/Page";
import data from "../customerInfo/CustomerListView/data";
import Results from "./Results";
import Toolbar from "./Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
}));

const Inventory = () => {
  const classes = useStyles();
  const [customers] = useState(data);

  return (
    <Page className={classes.root} title="Inventory">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default Inventory;
