import {NUMBER_STATUS, NumberStatus} from "./Game";
import {Button} from "@mui/material";
import {MouseEvent} from "react";

interface NumberButtonProps {
  number: number,
  onClick?: (event: MouseEvent) => void
}

interface GenericNumberButtonProps extends NumberButtonProps {
  numberStatus: NumberStatus
}


export const RedButton = ({number, onClick}: NumberButtonProps) => {
  return <Button color="error" onClick={onClick} variant="contained">{number}</Button>
}

const GreenButton = ({number, onClick}: NumberButtonProps) => {
  return <Button color="success" onClick={onClick} variant="contained">{number}</Button>
}

const SecondaryButton = ({number, onClick}: NumberButtonProps) => {
  return <Button color="secondary" onClick={onClick} variant="contained">{number}</Button>
}

const PrimaryNumberButton = ({number, onClick}: NumberButtonProps) => {
  return <Button sx={{backgroundColor: "#DCE5F3", color: "#192F53"}} variant="contained"
                 onClick={onClick}>{number}</Button>
}

const DisabledButton = ({number}: NumberButtonProps) => {
  return <Button sx={{backgroundColor: "#DCE5F3"}} disabled>{number}</Button>
}


const NumberButton = ({
                        number,
                        numberStatus,
                        onClick = () => undefined
                      }: GenericNumberButtonProps) => {
  switch (numberStatus) {
    case NUMBER_STATUS.AVAILABLE:
      return <PrimaryNumberButton number={number} onClick={onClick}/>
    case NUMBER_STATUS.CANDIDATE:
      return <SecondaryButton number={number} onClick={onClick}/>
    case NUMBER_STATUS.DISABLED:
      return <DisabledButton number={number}/>
    case NUMBER_STATUS.WRONG:
      return <RedButton number={number} onClick={onClick}/>
    case NUMBER_STATUS.USED:
      return <GreenButton number={number} onClick={onClick}/>
    default:
      return null
  }
}

export default NumberButton