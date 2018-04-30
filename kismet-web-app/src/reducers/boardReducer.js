import { UPDATE_TURN, NUM_PLAYERS, UPDATE_DICE, TOGGLE_HIGHLIGHTED } from '../actions/constants';

const initialState = {
	turn: 1,
	round: 1,
	players: 2,
	dice: Array(5).fill(null),
	highlighted: Array(5).fill(true),
	rolls_left: 3
}

export default function(state=initialState, action) {
	switch(action.type) {
		case NUM_PLAYERS:
			return {
				...state,
				players: action.players
			}
		case UPDATE_TURN:
			var next_turn;
			var next_round = state.round; 
			if (state.players == 1) {
				next_turn = 1;
				next_round = state.round + 1; 
			}
			else {
				next_turn = 3 - state.turn
				if (next_turn == 1)
					next_round++;
			}
			return {
				...state,
				turn: next_turn,
				round: next_round,
				rolls_left: 3,
				highlighted: Array(5).fill(true)
			};
		case UPDATE_DICE:
			return {
				...state,
				dice: action.dice,
				rolls_left: state.rolls_left - 1
			};
		case TOGGLE_HIGHLIGHTED:
			return {
				...state,
				highlighted: action.highlighted
			}
		default:
			return state;
	}
}
