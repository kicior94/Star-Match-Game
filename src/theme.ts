import {createTheme} from "@mui/material";
import {red} from "@mui/material/colors"

const theme = createTheme({
  palette: {
    primary: {
      main: "#192F53",
    },
    secondary: {
      main: "#FFBE0B"
    },
    error: {
      main: red.A400
    }
  }
})

export default theme