import { UPDATE_TURN, GAME_TYPE, ROLL_DICE, RESET_BOARD,
		 GAME_IS_OVER, TOGGLE_HIGHLIGHTED, TOGGLE_START_SCREEN,
		 TOGGLE_RULE_SHEET } from '../actions/constants';

const initialState = {
	turn: 1,
	round: 1,
	game_type: 'solo',
	dice: [randomRoll(), randomRoll(), randomRoll(), randomRoll(), randomRoll()],
	highlighted: Array(5).fill(true),
	rolls_left: 3,
	game_over: false,
	rule_sheet: false,
	start_screen: true
}

function randomRoll() {
	return Math.floor(Math.random() * 6) + 1; 
}

export default function(state=initialState, action) {
	switch(action.type) {
		case GAME_TYPE:
			return {
				...state,
				game_type: action.game_type
			}
		case UPDATE_TURN:
			var next_turn;
			var next_round = state.round; 
			if (state.game_type == 'solo') {
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
		case TOGGLE_RULE_SHEET:
			return {
				...state,
				rule_sheet: action.b
			}
		case TOGGLE_START_SCREEN:
			return {
				...state,
				start_screen: action.b
			}
		case RESET_BOARD:
			return initialState;
		default:
			return state;
	}
}
