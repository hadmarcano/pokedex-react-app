import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Image404 from "../assets/images/404poke.jpg";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

import { mainStyles } from "../styles/components/pokemonGrid";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

// STYLES

const useStyles = makeStyles(mainStyles);

const NotFound = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const AppBarColor = {
    background: "#202020",
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" style={AppBarColor}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Tournaments" href="/tournaments" {...a11yProps(0)} />
          {/* <LinkTab label="Favorites" href="/favorites" {...a11yProps(1)} /> */}
          {/* <LinkTab label="Abilities" href="/abilities" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.container_main}>
            <Paper className={classes.paper_main}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <img src={Image404} alt={"404-image"} />
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <TypePokemonContextProvider> */}
        {"Favorites"}
        {/* </TypePokemonContextProvider> */}
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Movies
      </TabPanel> */}
    </div>
  );
};

export default NotFound;
