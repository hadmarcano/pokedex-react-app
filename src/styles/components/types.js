import { orange } from "@material-ui/core/colors";

export const mainStyles = (theme) => ({
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
  table: {
    minWidth: "auto",
  },
});
