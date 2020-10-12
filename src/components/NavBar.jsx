import React from "react";

//imports from material
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {},
  flight: {
    float: "right",
    margin: "15px",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          ></IconButton>

          <FlightTakeoffIcon className={classes.flight}> </FlightTakeoffIcon>
          <Typography className={classes.title} variant="h5" noWrap>
            Vacationly Safe Travel!
          </Typography>
          
     
        </Toolbar>
      </AppBar>
    </div>
  );
}
