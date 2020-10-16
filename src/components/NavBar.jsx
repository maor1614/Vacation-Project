import React from "react";

//imports from material
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    textAlign: "center",
  },
  appbar: {
    fontFamily: "Nunito",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  appBarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.appBarWrapper}>
          <h1 className={classes.appbarTitle}>
            Welcome To Vacationly <span> Safe Travel!.</span>
          </h1>
          <IconButton></IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
