import { UPDATE_TURN, NUM_PLAYERS, ROLL_DICE, RESET_BOARD,
		 GAME_IS_OVER, TOGGLE_HIGHLIGHTED } from '../actions/constants';

const initialState = {
	turn: 1,
	round: 1,
	players: 2,
	dice: [randomRoll(), randomRoll(), randomRoll(), randomRoll(), randomRoll()],
	highlighted: Array(5).fill(true),
	rolls_left: 3,
	game_over: false,
}

function randomRoll() {
	return Math.floor(Math.random() * 6) + 1; 
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
				highlighted: Array(5).fill(true),
			};
		case ROLL_DICE:
			var new_dice = state.dice.slice();

			for (let i = 0; i < new_dice.length; i++) {
				if (state.highlighted[i]) 
					new_dice[i] = randomRoll();
			}

			return {
				...state,
				rolls_left: state.rolls_left - 1,
				dice: new_dice,
				highlighted: Array(5).fill(false)
			};
		case TOGGLE_HIGHLIGHTED:
			var new_highlighted = state.highlighted.slice();
			new_highlighted[action.i] = !state.highlighted[action.i];
			return {
				...state,
				highlighted: new_highlighted
			}
		case GAME_IS_OVER:
			return {
				...state,
				game_over: true
			}
		case RESET_BOARD:
			return initialState;
		default:
			return state;
	}
}
