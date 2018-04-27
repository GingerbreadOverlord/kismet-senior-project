import { UPDATE_TURN, NUM_PLAYERS } from './constants.js';

export const updateTurn = () => ({
	type: UPDATE_TURN
})

export const numPlayers = players => ({
	type: NUM_PLAYERS,
	players: players
})