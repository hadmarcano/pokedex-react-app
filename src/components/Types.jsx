import React, { useEffect, useState, useContext } from "react";
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
                        Types of Pókemon!
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
                  <CardHeader
                    classes={{
                      title: classes.card_header_style,
                      subheader: classes.card_subHeader_style,
                    }}
                    title={`aefaefae`}
                    subheader={`afweaefae`}
                  />
                  <CardMedia className={classes.media} title={`aefafeafaf`}>
                    {"hdhahsd"}
                  </CardMedia>
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
                      <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                          <div>
                            <div className={classes.root}>
                              <Typography className={classes.subtitle_stat}>
                                {"stat"}
                              </Typography>

                              <BorderLinearProgress
                                variant="determinate"
                                // value={stat.base_stat}
                              />
                            </div>
                          </div>
                        </Paper>
                      </Grid>
                    </Grid>
                    <div className={classes.abilities_container}>
                      <Typography className={classes.title_abilities}>
                        Abilities
                      </Typography>
                    </div>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <div>
                          <div className={classes.root}>
                            <Chip
                              //   icon={<FaceIcon />}
                              key={""}
                              label={"ability"}
                              clickable
                              color="primary"
                              //   onDelete={handleDelete}
                              //   deleteIcon={<DoneIcon />}
                            />
                          </div>
                        </div>
                      </Grid>
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
                            {` Lbs`}
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

export default Types;
