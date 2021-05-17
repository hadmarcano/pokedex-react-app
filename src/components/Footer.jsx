import React from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "0",
    height: "auto",
    backgroundColor: "#202020",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footer__made: {
    // display: "flex",
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    color: "#fcfcfc",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  logo: {
    marginLeft: "5px",
    textDecoration: "none",
    color: "#fcfcfc",
  },
  logoImg: {},
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  footer__location: {
    color: "#fcfcfc",
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

const Footer = () => {
  const AppBarColor = {
    background: "#202020",
  };
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <div className={classes.footer__made}>
            Made with{" "}
            <span role="img" aria-label="heart">
              💜
            </span>{" "}
            <a
              href="https://www.linkedin.com/in/hector-adolfo-diaz-marcano-ab0a27aa/"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.logo}
            >
              <span className={classes.logoImg}>&lt;&gt;</span>{" "}
              <span>Héctor Díaz</span>
            </a>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.footer__location}>
            CL-RM,
            <span>Santiago ,</span>
            2021.
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
