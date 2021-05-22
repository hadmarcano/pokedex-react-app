import React, {
  useContext,
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
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
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Search from "../components/Search";
import useCharacters from "../hooks/useCharacters";
import AppContext from "../context/AppContext";
import { getPokemonCharacters } from "../constants/index";
import { CharacterContext } from "../context/CharacterContext";
import {
  mainStyles,
  borderLinearStyle,
  colorButtonStyle,
  tableCellStyle,
  tableRowStyle,
} from "../styles/components/pokemonGrid";

// STYLES

const StyledTableCell = withStyles(tableCellStyle)(TableCell);

const StyledTableRow = withStyles(tableRowStyle)(TableRow);

const ColorButton = withStyles(colorButtonStyle)(Button);

const BorderLinearProgress = withStyles(borderLinearStyle)(LinearProgress);

const useStyles = makeStyles(mainStyles);

const PokemonGrid = () => {
  const { favorites, addToFavorite, removeFromFavorite } =
    useContext(AppContext);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);
  const classes = useStyles();
  const characters = useCharacters(getPokemonCharacters());

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const filteredUsers = useMemo(() =>
    characters.filter(
      (pokemon) => {
        return pokemon.name.toLowerCase().includes(search.toLowerCase());
      },
      [search, characters]
    )
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.container_main}>
          <Paper className={classes.paper_main}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Search
                  search={search}
                  searchInput={searchInput}
                  handleSearch={handleSearch}
                />
              </Grid>
            </Grid>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {filteredUsers.map((tile) => (
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
                    }}
                    actionIcon={
                      <IconButton
                        aria-label={`star ${tile.name}`}
                        onClick={() => {
                          addToFavorite(tile);
                        }}
                      >
                        <StarBorderIcon className={classes.titleList} />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.container_main}>
          <Paper className={classes.paper_main}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div>
                    <div>
                      <Typography className={classes.title}>
                        Your favorite Pokemons!
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {favorites.map((tile) => (
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
                    }}
                    actionIcon={
                      <IconButton
                        aria-label={`star ${tile.name}`}
                        onClick={() => {
                          removeFromFavorite(tile);
                        }}
                      >
                        <DeleteForeverOutlinedIcon
                          className={classes.titleList}
                        />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PokemonGrid;
