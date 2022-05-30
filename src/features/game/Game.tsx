import useGameState from "./hooks";
import {utils} from "./utils";
import Grid from '@mui/material/Grid';
import NumberButtons from "./NumberButtons";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import Screen from "./Screen";

interface GameProps {
  startNewGame: () => void;
}

export const GAME_STATUS = {
  ACTIVE: "active",
  LOST: "lost",
  WON: "won",
};

export const NUMBER_STATUS = {
  AVAILABLE: "available",
  CANDIDATE: "candidate",
  USED: "used",
  WRONG: "wrong",
  DISABLED: "disabled"
};

export type GameStatus = typeof GAME_STATUS[keyof typeof GAME_STATUS];
export type NumberStatus = typeof NUMBER_STATUS[keyof typeof NUMBER_STATUS];

const getGameStatus = (availableNums: number[], secondsLeft: number) => {
  const allAvailableNumsChosen = availableNums.length === 0;
  const noTimeLeft = secondsLeft === 0;

  return allAvailableNumsChosen
      ? GAME_STATUS.WON
      : noTimeLeft
          ? GAME_STATUS.LOST
          : GAME_STATUS.ACTIVE;
};

const Game = ({startNewGame}: GameProps) => {
  const {stars, availableNums, candidateNums, secondsLeft, setGameState} =
      useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus: GameStatus = getGameStatus(availableNums, secondsLeft);

  return <Grid container spacing={1}>
    <Grid container item xs={12} sx={{minHeight: "20vh"}} alignItems="center"><Screen
        gameStatus={gameStatus} starsCount={stars}/></Grid>
    <Grid item xs={12}><NumberButtons
        availableNums={availableNums}
        candidateNums={candidateNums}
        candidatesAreWrong={candidatesAreWrong}
        setGameState={setGameState} secondsLeft={secondsLeft}
        gameStatus={gameStatus}
    /></Grid>
    <Grid container item xs={12}>
      <Typography sx={{color: "#DCE5F3"}} variant="body2">
        Time remaining: {secondsLeft} seconds.
      </Typography>
    </Grid>
    <Grid mt={5} container item xs={12} justifyContent="center" alignContent="center">
      <Button color="warning" variant="contained" disabled={gameStatus === GAME_STATUS.ACTIVE}
              onClick={startNewGame}>Play
        again</Button>
    </Grid>
  </Grid>;
};

export default Game;
