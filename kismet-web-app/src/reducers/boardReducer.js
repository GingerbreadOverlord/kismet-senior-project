import { UPDATE_TURN, NUM_PLAYERS, UPDATE_DICE, RESET_BOARD,
		 GAME_IS_OVER, NEXT_ROLL, REFRESH_DICE, MAKE_CALL } from '../actions/constants';

const initialState = {
	turn: 1,
	roll_time: 0,
	round: 1,
	players: 2,
	dice: Array(5).fill(null),
	disabled: Array(5).fill(true),
	rolls_left: 3,
	game_over: false,
	initial_calls: 0
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
				disabled: Array(5).fill(true),
				initial_calls: 5
			};
		case UPDATE_DICE:
			var new_dice = state.dice.slice();
			var new_disabled = state.disabled.slice();
			new_dice[action.i] = action.val;
			new_disabled[action.i] = true;
			console.log(action.val, action.i, state.dice, new_dice, new_disabled);
			return {
				...state,
				dice: new_dice,
				disabled: new_disabled
			};
		case NEXT_ROLL:
			return {
				...state,
				rolls_left: state.rolls_left - 1,
				disabled: Array(5).fill(false)
			}
		case REFRESH_DICE:
			return {
				...state,
				disabled: Array(5).fill(false)
			}
		case GAME_IS_OVER:
			return {
				...state,
				game_over: true
			}
		case MAKE_CALL:
			console.log('we here');
			return {
				...state,
				initial_calls: state.initial_calls + 1
			}
		case RESET_BOARD:
			return initialState;
		default:
			return state;
	}
}
