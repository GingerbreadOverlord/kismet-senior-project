import { UPDATE_SCORE } from '../actions/constants';

const initialState = {
	p1_categories: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0],
	p2_categories: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0]
}

export default function(state=initialState, action) {
	switch(action.type) {
		case UPDATE_SCORE:
			if (action.p1) {
				return {
					...state,
					p1_categories: action.updated_categories
				};
			}
			else {
				return {
					...state,
					p2_categories: action.updated_categories
				};
			}
		default:
			return state;
	}
}