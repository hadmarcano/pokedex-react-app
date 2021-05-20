import React, { useContext, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getPokemonNames } from "../constants/index";
import { CharacterContext } from "../context/CharacterContext";
import {
  mainStyles,
  borderLinearStyle,
  colorButtonStyle,
  tableCellStyle,
  tableRowStyle,
} from "../styles/components/characters";

// STYLES

const StyledTableCell = withStyles(tableCellStyle)(TableCell);

const StyledTableRow = withStyles(tableRowStyle)(TableRow);

const ColorButton = withStyles(colorButtonStyle)(Button);

const BorderLinearProgress = withStyles(borderLinearStyle)(LinearProgress);

const useStyles = makeStyles(mainStyles);

const Characters = () => {
  const {
    changeCurrentQPokemon,
    pokemonDetail,
    doneFetchPokemon,
    changeDoneFetchPokemon,
  } = useContext(CharacterContext);
  const [loader, setLoader] = useState(getPokemonNames());
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [namesToSelect, setNamesToSelect] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getPokemonNamesToSelect();
  }, [loader]);

  const getPokemonNamesToSelect = () => {
    fetch(loader)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNext(data.next);
        setPrev(data.previous);
        setNamesToSelect(data.results);
        changeDoneFetchPokemon(true);
      });
  };

  const onClickView = (name) => {
    console.log(name);
    changeCurrentQPokemon(name);
  };

  const onNext = () => {
    console.log(next);
    changeDoneFetchPokemon(false);
    setLoader(next);
  };

  const onPrev = () => {
    console.log(prev);
    changeDoneFetchPokemon(false);
    setLoader(prev);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.container_main}>
          <Paper className={classes.paper_main}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12} sm={6}> */}
              <Grid item xs>
                <Paper className={classes.paper}>
                  <div>
                    <div>
                      <Typography className={classes.title}>
                        Know your pókemon!
                      </Typography>
                    </div>
                    <br />

                    <div>
                      <TableContainer component={Paper}>
                        <Table
                          className={classes.table}
                          aria-label="customized table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Pokemon</StyledTableCell>
                              <StyledTableCell align="right">
                                Actions
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          {doneFetchPokemon ? (
                            <TableBody>
                              {namesToSelect.map((row) => (
                                <StyledTableRow key={row.name}>
                                  <StyledTableCell component="th" scope="row">
                                    {row.name}
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    <Button
                                      size="small"
                                      variant="contained"
                                      onClick={() => {
                                        onClickView(row.name);
                                      }}
                                      color="primary"
                                    >
                                      view
                                    </Button>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          ) : (
                            <div className={classes.circularStyles}>
                              <div className={classes.circularItem}>
                                <CircularProgress />
                              </div>
                            </div>
                          )}
                        </Table>
                      </TableContainer>
                      <br />
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          {prev !== null && (
                            <ColorButton
                              size="small"
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                onPrev();
                              }}
                            >
                              previous
                            </ColorButton>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <ColorButton
                            color="primary"
                            size="small"
                            variant="contained"
                            onClick={() => {
                              onNext();
                            }}
                          >
                            Next
                          </ColorButton>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Paper>
              </Grid>
              {/* <Grid item xs={12} sm={6}> */}
              <Grid item xs>
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
                    </>
                  )}
                </Card>
              </Grid>
              <Grid item xs className={classes.content_get_out}>
                <Card className={classes.paper}>
                  <CardContent>
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
                              <div>
                                <div className={classes.root}>
                                  <Chip
                                    //   icon={<FaceIcon />}
                                    key={ability.name}
                                    label={ability.ability.name}
                                    clickable
                                    color="primary"
                                    //   onDelete={handleDelete}
                                    //   deleteIcon={<DoneIcon />}
                                  />
                                </div>
                              </div>
                            </Grid>
                          );
                        })}
                    </Grid>
                    <br />
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                          <Typography className={classes.title_abilities}>
                            Weight
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                          <Typography className={classes.subtitle_stat}>
                            {`${pokemonDetail.weight} Lbs`}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Characters;
