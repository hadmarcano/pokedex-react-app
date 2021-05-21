import React from "react";
import { Link } from "react-router-dom";
import Characters from "../components/Characters";
import Types from "../components/Types";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//Contexts
import PokemonContextProvider from "../context/CharacterContext";
import TypePokemonContextProvider from "../context/TypesContext";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const AppBarColor = {
    background: "#202020",
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={AppBarColor}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Pokemons" href="/pokemon" {...a11yProps(0)} />
          <LinkTab label="Types" href="/types" {...a11yProps(1)} />
          {/* <LinkTab label="Abilities" href="/abilities" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PokemonContextProvider>
          <Characters />
        </PokemonContextProvider>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TypePokemonContextProvider>
          <Types />
        </TypePokemonContextProvider>
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Movies
      </TabPanel> */}
    </div>
  );
};

export default Home;
