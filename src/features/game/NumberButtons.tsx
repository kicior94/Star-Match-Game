import Grid from "@mui/material/Grid";
import NumberButton from "./NumberButton";
import {GAME_STATUS, GameStatus, NUMBER_STATUS, NumberStatus} from "./Game";
import {nanoid} from "nanoid";
import {MouseEvent} from "react";

interface NumberButtonsProps {
  availableNums: number [],
  candidateNums: number[],
  candidatesAreWrong: boolean,
  secondsLeft: number,
  setGameState: (numCandidates: number []) => void,
  gameStatus: GameStatus
}

const getNumberStatus = (
    number: number,
    availableNums: number[],
    candidateNums: number[],
    candidatesAreWrong: boolean,
    gameStatus: GameStatus
) => {
  const wasAlreadyChosen = !availableNums.includes(number);
  const isSelected = candidateNums.includes(number);

  if (gameStatus !== GAME_STATUS.ACTIVE) {
    return NUMBER_STATUS.DISABLED;
  } else if (wasAlreadyChosen) {
    return NUMBER_STATUS.USED;
  } else if (isSelected && candidatesAreWrong) {
    return NUMBER_STATUS.WRONG;
  } else if (isSelected) {
    return NUMBER_STATUS.CANDIDATE;
  } else {
    return NUMBER_STATUS.AVAILABLE;
  }
};

const NumberButtons = ({
                         availableNums,
                         candidateNums,
                         candidatesAreWrong,
                         secondsLeft,
                         setGameState,
                         gameStatus
                       }: NumberButtonsProps) => {
  const onNumberButtonClickHandler = (number: number, numberStatus: NumberStatus) => (event: MouseEvent) => {
    const numberUsedOrGameOver =
        numberStatus === NUMBER_STATUS.USED || secondsLeft === 0;

    if (numberUsedOrGameOver) {
      return;
    }

    const newCandidateNums =
        numberStatus === NUMBER_STATUS.AVAILABLE
            ? candidateNums.concat(number)
            : candidateNums.filter((cn) => cn !== number);
    setGameState(newCandidateNums);
  };


  const numberButtons = []
  for (let number = 1; number < 10; number++) {
    const numberStatus = getNumberStatus(number, availableNums, candidateNums, candidatesAreWrong, gameStatus)
    const numberButton = <NumberButton number={number} numberStatus={numberStatus}
                                       onClick={onNumberButtonClickHandler(number, numberStatus)}
    />
    numberButtons.push(<Grid container item xs={4} justifyContent="center" key={nanoid()}>{numberButton}</Grid>)
  }

  return <Grid container columnSpacing={1} rowSpacing={1} justifyContent="center">{numberButtons}</Grid>


}

export default NumberButtons