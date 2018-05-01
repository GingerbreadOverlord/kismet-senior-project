import { UPDATE_TURN, NUM_PLAYERS, UPDATE_DICE, RESET_BOARD, 
		 GAME_IS_OVER, NEXT_ROLL, REFRESH_DICE, MAKE_CALL } from './constants.js';

export const updateTurn = () => ({
	type: UPDATE_TURN
})

export const numPlayers = players => ({
	type: NUM_PLAYERS,
	players: players
})

export const updateDice = (val, i) => ({
	type: UPDATE_DICE,
	val: val,
	i: i
})

export const gameIsOver = () => ({
	type: GAME_IS_OVER
})

export const resetBoard = () => ({
	type: RESET_BOARD
})

export const nextRoll = () => ({
	type: NEXT_ROLL
})

export const refreshDice = () => ({
	type: REFRESH_DICE
})

export const makeCall = () => ({
	type: MAKE_CALL
})