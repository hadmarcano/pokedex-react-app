import React, { useContext, useState, useEffect, Suspense, lazy } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
// Hooks
import usePokemonNames from "../hooks/usePokemonNames";
// Contexts
import { CharacterContext } from "../context/CharacterContext";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper_main: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#616161",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper_abilities: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#e3350d",
  },
  title: {
    fontFamily: "Roboto Condensed",
    fontSize: "22px",
    fontWeight: "600",
    flexGrow: 1,
    color: "#313131",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    pos: {
      marginBottom: 12,
      fontFamily: "Roboto Condensed",
      color: "#313131",
    },
    formControl: {
      margin: theme.spacing(2),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    circular: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  },
  abilities_container: {
    marginTop: 20,
    marginBottom: 20,
  },
  title_abilities: {
    fontFamily: "Roboto Condensed",
    fontSize: "18px",
    fontWeight: "600",
    flexGrow: 1,
    color: "#e3350d",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  subtitle_stat: {
    fontFamily: "Roboto Condensed",
    fontSize: "18px",
    fontWeight: "600",
    flexGrow: 1,
    color: "#4dad5b",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  card_header_style: {
    fontFamily: "Roboto Condensed",
    fontSize: "22px",
    color: "#313131",
    fontWeight: "600",
  },
  card_subHeader_style: {
    fontFamily: "Roboto Condensed",
    // fontSize: "22px",
    color: "#4dad5b",
    fontWeight: "600",
  },
  subtitle_abilities: {
    fontFamily: "Roboto Condensed",
    fontSize: "18px",
    fontWeight: "600",
    flexGrow: 1,
    color: "#FFF",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

const Characters = () => {
  const { changeCurrentQPokemon, pokemonDetail, currentQPokemon } =
    useContext(CharacterContext);
  const pokemonNames = usePokemonNames();
  const [namesToSelect, setNamesToSelect] = useState(pokemonNames);
  const classes = useStyles();

  useEffect(() => {
    console.log(pokemonNames);

    setNamesToSelect(pokemonNames);
  }, []);

  const handleChangeSelect = (event) => {
    const pokemon = event.target.value;
    console.log(pokemon);
    changeCurrentQPokemon(pokemon);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper_main}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <div>
                    <div>
                      <Typography className={classes.title}>
                        Know your pókemon!
                      </Typography>
                    </div>
                    <div>
                      <Typography className={classes.pos}>
                        Use select field to find Pokemon!
                      </Typography>
                    </div>
                    <div className={classes.select_container}>
                      <FormControl
                        style={{ minWidth: 220 }}
                        variant="outlined"
                        className={classes.formControl}
                      >
                        {/* <InputLabel htmlFor="filled-age-native-simple">
                          Pókemon
                        </InputLabel> */}
                        <Select
                          className={classes.select_container}
                          value={currentQPokemon}
                          onChange={(event) => {
                            handleChangeSelect(event);
                          }}
                          //   inputProps={{
                          //     name: "age",
                          //     id: "filled-age-native-simple",
                          //   }}
                        >
                          <option aria-label="None" value="" />
                          {namesToSelect.map((pokemon) => {
                            return (
                              <option value={pokemon.name}>
                                {pokemon.name}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className={classes.abilities_container}>
                      <Typography className={classes.title_abilities}>
                        Stats
                      </Typography>
                    </div>
                    <Grid container spacing={3}>
                      {Object.entries(pokemonDetail).length > 0 &&
                        pokemonDetail.stats.map((stat) => {
                          return (
                            <Grid item xs={12} sm={6}>
                              <Paper className={classes.paper}>
                                <div>
                                  <div className={classes.root}>
                                    <Typography
                                      className={classes.subtitle_stat}
                                    >
                                      {stat.stat.name}
                                    </Typography>

                                    <BorderLinearProgress
                                      variant="determinate"
                                      value={stat.base_stat}
                                    />
                                  </div>
                                </div>
                              </Paper>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card className={classes.paper}>
                  {Object.entries(pokemonDetail).length > 0 && (
                    <>
                      <CardHeader
                        classes={{
                          title: classes.card_header_style,
                          subheader: classes.card_subHeader_style,
                        }}
                        title={`${pokemonDetail.name}`}
                        subheader={`${pokemonDetail.types[0].type.name}`}
                      />
                      <CardMedia
                        className={classes.media}
                        title={`${pokemonDetail.name}`}
                      >
                        <img
                          width={"100%"}
                          height={"auto"}
                          src={
                            pokemonDetail.sprites.other["official-artwork"]
                              .front_default
                          }
                        />
                      </CardMedia>
                      <CardContent>
                        <div className={classes.abilities_container}>
                          <Typography className={classes.title_abilities}>
                            Abilities
                          </Typography>
                        </div>
                        <Grid container spacing={3}>
                          {Object.entries(pokemonDetail).length > 0 &&
                            pokemonDetail.abilities.map((ability) => {
                              return (
                                <Grid item xs={12} sm={6}>
                                  {/* <Paper className={classes.paper_abilities}> */}
                                  <div>
                                    <div className={classes.root}>
                                      <Chip
                                        //   icon={<FaceIcon />}
                                        label={ability.ability.name}
                                        clickable
                                        color="primary"
                                        //   onDelete={handleDelete}
                                        //   deleteIcon={<DoneIcon />}
                                      />
                                      {/* <Typography
                                      className={classes.subtitle_abilities}
                                    >
                                      {ability.ability.name}
                                    </Typography>
                                    <Typography
                                      className={classes.subtitle_abilities}
                                    >
                                      {ability.ability.url}
                                    </Typography> */}
                                    </div>
                                  </div>
                                  {/* </Paper> */}
                                </Grid>
                              );
                            })}
                        </Grid>
                      </CardContent>
                    </>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Characters;
