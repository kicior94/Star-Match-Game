import {GAME_STATUS, GameStatus} from "./Game";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ResultInfo = ({gameStatus}: { gameStatus: GameStatus }) => {
  let component;
  switch (gameStatus) {
    case GAME_STATUS.WON:
      component = <Typography color="secondary" variant="h5">You won!</Typography>
      break;
    case GAME_STATUS.LOST:
      component = <Typography color="secondary" variant="h5">You lost!</Typography>
      break;
    default:
      return null
  }
  return <Grid container item xs={12} justifyContent="center">
    {component}
  </Grid>
}

export default ResultInfo