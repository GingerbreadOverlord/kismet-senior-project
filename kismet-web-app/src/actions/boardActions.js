import { UPDATE_TURN, NUM_PLAYERS, UPDATE_DICE, RESET_BOARD, TOGGLE_HIGHLIGHTED, GAME_IS_OVER } from './constants.js';

export const updateTurn = () => ({
	type: UPDATE_TURN
})

export const numPlayers = players => ({
	type: NUM_PLAYERS,
	players: players
})

export const updateDice = dice => ({
	type: UPDATE_DICE,
	dice: dice
})

export const toggleHighlighted = highlighted => ({
	type: TOGGLE_HIGHLIGHTED,
	highlighted: highlighted
})

export const gameIsOver = () => ({
	type: GAME_IS_OVER
})

export const resetBoard = () => ({
	type: RESET_BOARD
})