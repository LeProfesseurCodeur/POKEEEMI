import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#3B5AA7",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
