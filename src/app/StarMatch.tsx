import Game from "../features/game/Game";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import {getGameId, onStartNewGame} from "../features/game/gameSlice";
import {useAppDispatch, useAppSelector} from "./hooks";

const StarMatch = () => {
  const gameId = useAppSelector(getGameId)
  const dispatch = useAppDispatch()

  const startNewGame = () => dispatch(onStartNewGame())

  return (
      <Box sx={{
        background: "linear-gradient(180deg, rgba(25,47,83,1) 0%, rgba(0,92,240,1) 60%, rgba(255,255,255,1) 100%)",
        height: "100vh"
      }} p={2}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12}>
            <Typography sx={{color: "#DCE5F3"}} variant="h4" align="center">
              Star Match Game {gameId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{color: "#DCE5F3"}} variant="body1" align="center">
              Pick one or more numbers that sum up to the number of stars.
            </Typography>
          </Grid>
          <Grid item>
            <Game startNewGame={startNewGame}/>
          </Grid>
        </Grid>
      </Box>
  );
};

export default StarMatch;
