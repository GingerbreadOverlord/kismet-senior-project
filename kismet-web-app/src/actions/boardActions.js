import { UPDATE_TURN, NUM_PLAYERS, UPDATE_DICE } from './constants.js';

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