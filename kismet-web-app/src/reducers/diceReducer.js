import { UPDATE_DICE } from '../actions/constants';

const initialState = {
	roll_values: Array(5).fill(null)
}

export default function(state=initialState, action) {
	switch(action.type) {
		case UPDATE_DICE:
			return {
				...state,
				roll_values: action.roll_values
			};		
		default:
			return state;
	}
}