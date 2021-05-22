import React, { useEffect, useState, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
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
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
//CONSTANTS & CONTEXTS
import { getTypeOfPokemons } from "../constants/index";
import { TypesContext } from "../context/TypesContext";
//SHEETS STYLES
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

const Types = () => {
  const {
    currentQType,
    changeCurrentQType,
    typeDetail,
    doneFetchTypes,
    changeDoneFetchTypes,
    pokemonsByTypes,
  } = useContext(TypesContext);
  const [loader, setLoader] = useState(getTypeOfPokemons());
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [typesForTable, setTypesForTable] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getTypesForFillTable();
  }, [loader]);

  const getTypesForFillTable = () => {
    fetch(loader)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNext(data.next);
        setPrev(data.previous);
        setTypesForTable(data.results);
        changeDoneFetchTypes(true);
      });
  };

  const onClickView = (name) => {
    console.log(name);
    changeCurrentQType(name);
  };

  const onNext = () => {
    console.log(next);
    changeDoneFetchTypes(false);
    setLoader(next);
  };

  const onPrev = () => {
    console.log(prev);
    changeDoneFetchTypes(false);
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
                        Click on View and scroll down!
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
                          {doneFetchTypes ? (
                            <TableBody>
                              {typesForTable.map((row) => (
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
                          {next !== null && (
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
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Paper>
              </Grid>
              {/* <Grid item xs={12} sm={6}> */}
              <Grid item xs className={classes.content_get_out}>
                <Paper className={classes.paper}>
                  <div>
                    <div>
                      <Typography className={classes.title}>Attacks</Typography>
                    </div>
                  </div>
                  <div className={classes.abilities_container}>
                    <Typography className={classes.title_abilities}>
                      Double damage to Pokémon of type:
                    </Typography>
                  </div>
                  <Grid container spacing={3}>
                    {Object.entries(typeDetail).length > 0 &&
                      (typeDetail.damage_relations.double_damage_to.length >
                      0 ? (
                        typeDetail.damage_relations.double_damage_to.map(
                          (type) => {
                            return (
                              <Grid item xs>
                                <div>
                                  <div className={classes.root}>
                                    <Chip
                                      //   icon={<FaceIcon />}
                                      key={type.url}
                                      label={type.name}
                                      clickable
                                      color="secondary"
                                      //   onDelete={handleDelete}
                                      //   deleteIcon={<DoneIcon />}
                                    />
                                  </div>
                                </div>
                              </Grid>
                            );
                          }
                        )
                      ) : (
                        <Grid item xs>
                          <Typography className={classes.subtitle_stat}>
                            No types...
                          </Typography>
                        </Grid>
                      ))}
                  </Grid>
                  <div className={classes.abilities_container}>
                    <Typography className={classes.title_abilities}>
                      Half damage to Pokémon of type:
                    </Typography>
                  </div>
                  <Grid container spacing={3}>
                    {Object.entries(typeDetail).length > 0 &&
                      (typeDetail.damage_relations.half_damage_to.length > 0 ? (
                        typeDetail.damage_relations.half_damage_to.map(
                          (type) => {
                            return (
                              <Grid item xs>
                                <div>
                                  <div className={classes.root}>
                                    <Chip
                                      //   icon={<FaceIcon />}
                                      key={type.url}
                                      label={type.name}
                                      clickable
                                      color="primary"
                                      //   onDelete={handleDelete}
                                      //   deleteIcon={<DoneIcon />}
                                    />
                                  </div>
                                </div>
                              </Grid>
                            );
                          }
                        )
                      ) : (
                        <Grid item xs>
                          <Typography className={classes.subtitle_stat}>
                            No types...
                          </Typography>
                        </Grid>
                      ))}
                  </Grid>
                  <div className={classes.abilities_container}>
                    <Typography className={classes.title_abilities}>
                      No damage to Pokémon of type:
                    </Typography>
                  </div>
                  <Grid container spacing={3}>
                    {Object.entries(typeDetail).length > 0 &&
                      (typeDetail.damage_relations.no_damage_to.length > 0 ? (
                        typeDetail.damage_relations.no_damage_to.map((type) => {
                          return (
                            <Grid item xs>
                              <div>
                                <div className={classes.root}>
                                  <Chip
                                    //   icon={<FaceIcon />}
                                    key={type.url}
                                    label={type.name}
                                    clickable
                                    // color="primary"
                                    //   onDelete={handleDelete}
                                    //   deleteIcon={<DoneIcon />}
                                  />
                                </div>
                              </div>
                            </Grid>
                          );
                        })
                      ) : (
                        <Grid item xs>
                          <Typography className={classes.subtitle_stat}>
                            No types...
                          </Typography>
                        </Grid>
                      ))}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs className={classes.content_get_out}>
                <Paper className={classes.paper}>
                  <div>
                    <div>
                      <Typography className={classes.title}>
                        Defenses
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.abilities_container}>
                    <Typography className={classes.title_abilities}>
                      Double damage from Pokémon of type:
                    </Typography>
                  </div>
                  <Grid container spacing={3}>
                    {Object.entries(typeDetail).length > 0 &&
                      (typeDetail.damage_relations.double_damage_from.length >
                      0 ? (
                        typeDetail.damage_relations.double_damage_from.map(
                          (type) => {
                            return (
                              <Grid item xs>
                                <div>
                                  <div className={classes.root}>
                                    <Chip
                                      //   icon={<FaceIcon />}
                                      key={type.url}
                                      label={type.name}
                                      clickable
                                      color="secondary"
                                      //   onDelete={handleDelete}
                                      //   deleteIcon={<DoneIcon />}
                                    />
                                  </div>
                                </div>
                              </Grid>
                            );
                          }
                        )
                      ) : (
                        <Grid item xs>
                          <Typography className={classes.subtitle_stat}>
                            No types...
                          </Typography>
                        </Grid>
                      ))}
                  </Grid>
                  <div className={classes.abilities_container}>
                    <Typography className={classes.title_abilities}>
                      Half damage from Pokémon of type:
                    </Typography>
                  </div>
                  <Grid container spacing={3}>
                    {Object.entries(typeDetail).length > 0 &&
                      (typeDetail.damage_relations.half_damage_from.length >
                      0 ? (
                        typeDetail.damage_relations.half_damage_from.map(
                          (type) => {
                            return (
                              <Grid item xs>
                                <div>
                                  <div className={classes.root}>
                                    <Chip
                                      //   icon={<FaceIcon />}
                                      key={type.url}
                                      label={type.name}
                                      clickable
                                      color="primary"
                                      //   onDelete={handleDelete}
                                      //   deleteIcon={<DoneIcon />}
                                    />
                                  </div>
                                </div>
                              </Grid>
                            );
                          }
                        )
                      ) : (
                        <Grid item xs>
                          <Typography className={classes.subtitle_stat}>
                            No types...
                          </Typography>
                        </Grid>
                      ))}
                  </Grid>
                  <div className={classes.abilities_container}>
                    <Typography className={classes.title_abilities}>
                      No damage from Pokémon of type:
                    </Typography>
                  </div>
                  <Grid container spacing={3}>
                    {Object.entries(typeDetail).length > 0 &&
                      (typeDetail.damage_relations.no_damage_from.length > 0 ? (
                        typeDetail.damage_relations.no_damage_from.map(
                          (type) => {
                            return (
                              <Grid item xs>
                                <div>
                                  <div className={classes.root}>
                                    <Chip
                                      //   icon={<FaceIcon />}
                                      key={type.url}
                                      label={type.name}
                                      clickable
                                      // color="primary"
                                      //   onDelete={handleDelete}
                                      //   deleteIcon={<DoneIcon />}
                                    />
                                  </div>
                                </div>
                              </Grid>
                            );
                          }
                        )
                      ) : (
                        <Grid item xs>
                          <Typography className={classes.subtitle_stat}>
                            No types...
                          </Typography>
                        </Grid>
                      ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.container_main}>
          <Paper className={classes.paper_main}>
            <ListSubheader component="div" className={classes.sub_title_list}>
              <Typography className={classes.sub_title_list}>
                {currentQType}
              </Typography>
            </ListSubheader>
            <div className={classes.rootList}>
              <GridList className={classes.gridList} cols={4}>
                {pokemonsByTypes.map((tile) => (
                  <GridListTile key={tile.id}>
                    <img
                      src={tile.sprites.other["official-artwork"].front_default}
                      alt={tile.name}
                      width={"auto"}
                      height={"auto"}
                    />
                    <GridListTileBar
                      title={tile.name}
                      classes={{
                        root: classes.titleBar,
                        title: classes.titleList,
                        footImage: classes.footImage,
                      }}
                      // actionIcon={
                      //   <IconButton aria-label={`star ${tile.name}`}>
                      //     <RemoveRedEyeOutlinedIcon
                      //       className={classes.titleList}
                      //     />
                      //   </IconButton>
                      // }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Types;
