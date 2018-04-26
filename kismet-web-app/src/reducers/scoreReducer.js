import { UPDATE_SCORE } form '../actions/constants';

const initialState = {
	p1_categories: Array(15).fill(null),
	p2_categories: Array(15).fill(null),
}

export default function(state=initialState, action) {
	switch(action.type) {
		case UPDATE_CATEGORY:
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
	}
}