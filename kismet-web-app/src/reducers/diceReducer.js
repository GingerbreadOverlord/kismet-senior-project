import { UPDATE_DICE, RESET_ROLLS } from '../actions/constants';

const initialState = {
	roll_values: Array(5).fill(null),
	rolls_left: 3
}

export default function(state=initialState, action) {
	switch(action.type) {
		case UPDATE_DICE:
			return {
				...state,
				roll_values: action.roll_values,
				rolls_left: state.rolls_left - 1
			};
		case RESET_ROLLS:
			return {
				...state,
				rolls_left: 3
			}		
		default:
			return state;
	}
}