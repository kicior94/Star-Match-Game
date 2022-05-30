import {GAME_STATUS, GameStatus} from "./Game";
import Stars from "./Stars";
import ResultInfo from "./ResultInfo";
import Grid from "@mui/material/Grid";


interface ScreenProps {
  gameStatus: GameStatus,
  starsCount: number
}

const Screen = ({gameStatus, starsCount}: ScreenProps) => {
  let component;
  if (gameStatus === GAME_STATUS.ACTIVE) {
    component = <Stars count={starsCount}/>
  } else {
    component = <ResultInfo gameStatus={gameStatus}/>
  }
  return <Grid container alignContent="center">{component}</Grid>
}

export default Screen;