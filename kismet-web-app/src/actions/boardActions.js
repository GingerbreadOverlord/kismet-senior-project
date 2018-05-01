import { UPDATE_TURN, NUM_PLAYERS, ROLL_DICE, RESET_BOARD, 
		 GAME_IS_OVER, TOGGLE_HIGHLIGHTED } from './constants.js';

export const updateTurn = () => ({
	type: UPDATE_TURN
})

export const numPlayers = players => ({
	type: NUM_PLAYERS,
	players: players
})

export const rollDice = dice => ({
	type: ROLL_DICE,
	dice: dice
})

export const gameIsOver = () => ({
	type: GAME_IS_OVER
})

export const resetBoard = () => ({
	type: RESET_BOARD
})

export const toggleHighlighted = i => ({
	type: TOGGLE_HIGHLIGHTED,
	i: i
})