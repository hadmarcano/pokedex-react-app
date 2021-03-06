import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AppContext from "../context/AppContext";

import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: "Roboto Condensed",
    fontSize: "22px",
    fontWeight: "300",
    flexGrow: 1,
    color: "#fcfcfc",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
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
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = () => {
  const { favorites } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const AppBarColor = {
    background: "#202020",
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={AppBarColor}>
        <Toolbar>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={handleMenu}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/favorites">Favorites</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/Tournaments">Tournaments</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to={"/about"}>About me</Link>
              </MenuItem>
            </Menu>
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            P??kedex
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={handleMenu}
              color="inherit"
            >
              <Badge badgeContent={favorites.length} color="error">
                <FavoriteIcon />
              </Badge>
              {/* <FavoriteBorderIcon /> */}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
};

export default Header;
