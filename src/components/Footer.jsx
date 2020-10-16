import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  footer: {
    backgroundColor: "theme.palette.background.paper",
    
    bottom: 0,
  },
});

function Footer(props) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <Paper elevation={1}>
        <Typography variant="h5" component="h3">
          Created By Maor Shiri
        </Typography>
        <Typography component="p">@2020 All right reserved</Typography>
      </Paper>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
