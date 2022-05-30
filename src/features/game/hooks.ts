import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  getAvailableNums,
  getCandidateNums,
  getSecondsLeft,
  getStars,
  onAvailableNumsChange,
  onCandidateNumsChange,
  onGameOver,
  onSecondsLeftChange,
  onStarsChange,
} from "./gameSlice";
import {useEffect} from "react";
import {utils} from "./utils";

export const useGameState = () => {
  const stars = useAppSelector(getStars);
  const availableNums = useAppSelector(getAvailableNums);
  const candidateNums = useAppSelector(getCandidateNums);
  const secondsLeft = useAppSelector(getSecondsLeft);
  const dispatch = useAppDispatch();

  const gameInProgress = secondsLeft > 0 && availableNums.length > 0;

  const updateTimer = () =>
      setTimeout(() => dispatch(onSecondsLeftChange(secondsLeft - 1)), 1000);

  const updateTimerIfGameInProgress = () => {
    if (gameInProgress) {
      const timerId = updateTimer();

      return () => clearTimeout(timerId);
    }
  };

  useEffect(updateTimerIfGameInProgress);

  const updateResultsHistory = () => {
    if (!gameInProgress) {
      dispatch(onGameOver())
    }
  }

  useEffect(updateResultsHistory)

  const setGameState = (newCandidateNums: number[]) => {
    const incorrectNumberOfStarsSelected =
        utils.sum(newCandidateNums) !== stars;
    if (incorrectNumberOfStarsSelected) {
      dispatch(onCandidateNumsChange(newCandidateNums));
    } else {
      const newAvailableNums = availableNums.filter(
          (n) => !newCandidateNums.includes(n)
      );
      const possibleRandomNumberOfStars = utils.randomSumIn(
          newAvailableNums,
          9
      );
      dispatch(onStarsChange(possibleRandomNumberOfStars));
      dispatch(onAvailableNumsChange(newAvailableNums));
      dispatch(onCandidateNumsChange([]));
    }
  };

  return {stars, availableNums, candidateNums, secondsLeft, setGameState};
};

export default useGameState;
