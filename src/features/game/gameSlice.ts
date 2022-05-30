import {utils} from "./utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface gameInitialState {
  gameState: {
    gameId: number;
    stars: number;
    availableNums: number[];
    candidateNums: number[];
    secondsLeft: number;
  }
}

export interface appInitialState extends gameInitialState {
  history: gameInitialState []
}

const initialState: appInitialState = {
  gameState: {
    gameId: 1,
    stars: utils.random(1, 9),
    availableNums: utils.range(1, 9),
    candidateNums: [],
    secondsLeft: 10,
  },
  history: []
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    onStarsChange: (state, action: PayloadAction<number>) => {
      state.gameState.stars = action.payload;
    },
    onSecondsLeftChange: (state, action: PayloadAction<number>) => {
      state.gameState.secondsLeft = action.payload;
    },
    onCandidateNumsChange: (state, action: PayloadAction<number[]>) => {
      state.gameState.candidateNums = action.payload;
    },
    onAvailableNumsChange: (state, action: PayloadAction<number[]>) => {
      state.gameState.availableNums = action.payload;
    },
    onStartNewGame: (state) => {
      state.gameState = {...initialState.gameState, gameId: state.gameState.gameId + 1}
    },
    onGameOver: (state) => {
      state.history.push({gameState: {...state.gameState}})
    }
  },
});

export const {
  onStarsChange,
  onSecondsLeftChange,
  onCandidateNumsChange,
  onAvailableNumsChange,
  onStartNewGame,
  onGameOver
} = gameSlice.actions;

export const getStars = (state: RootState) => state.game.gameState.stars;
export const getAvailableNums = (state: RootState) => state.game.gameState.availableNums;
export const getCandidateNums = (state: RootState) => state.game.gameState.candidateNums;
export const getSecondsLeft = (state: RootState) => state.game.gameState.secondsLeft;
export const getGameId = (state: RootState) => state.game.gameState.gameId;


export default gameSlice.reducer;
