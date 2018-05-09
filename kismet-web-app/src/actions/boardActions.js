import { UPDATE_TURN, GAME_TYPE, ROLL_DICE, RESET_BOARD, 
		 GAME_IS_OVER, TOGGLE_HIGHLIGHTED, TOGGLE_RULE_SHEET,
		 TOGGLE_START_SCREEN } from './constants.js';

export const updateTurn = () => ({
	type: UPDATE_TURN
})

export const gameType = game_type => ({
	type: GAME_TYPE,
	game_type: game_type
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

export const toggleRuleSheet = b => ({
	type: TOGGLE_RULE_SHEET,
	b: b 
})

export const toggleStartScreen = b => ({
	type: TOGGLE_START_SCREEN,
	b: b 
})