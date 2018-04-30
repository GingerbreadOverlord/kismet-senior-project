import { UPDATE_SCORE } from '../actions/constants';

const initialState = {
	p1_total: 0,
	p2_total: 0,
	p1_bonus: 0,
	p2_bonus: 0,
	p1_categories: [62, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
	p2_categories: [75, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
}

export default function(state=initialState, action) {
	switch(action.type) {
		case UPDATE_SCORE:
			if (action.p1 == 1) {
				var new_cats = state.p1_categories.slice();
				var bonus = 0;
				var basic_section = state.p1_categories[0] + state.p1_categories[1] + state.p1_categories[2] +
					state.p1_categories[3] + state.p1_categories[4] + state.p1_categories[5];
				new_cats[action.cat] = action.score;

				if (basic_section >= 63 && basic_section <= 70)
					bonus = 35;
				else if (basic_section >= 71 && basic_section <= 77) 
					bonus = 55;
				else if (basic_section >= 78) 
					bonus = 75;

				return {
					...state,
					p1_categories: new_cats,
					p1_total: state.p1_total + action.score - state.p1_bonus + bonus,
					p1_bonus: bonus
				};
			}
			else {
				var new_cats = state.p2_categories.slice();
				var bonus = 0;
				var basic_section = state.p2_categories[0] + state.p2_categories[1] + state.p2_categories[2] +
					state.p2_categories[3] + state.p2_categories[4] + state.p2_categories[5];
				new_cats[action.cat] = action.score;

				if (basic_section >= 63 && basic_section <= 70)
					bonus = 35;
				else if (basic_section >= 71 && basic_section <= 77) 
					bonus = 55;
				else if (basic_section >= 78) 
					bonus = 75;

				return {
					...state,
					p2_categories: new_cats,
					p2_total: state.p2_total + action.score - state.p2_bonus + bonus,
					p2_bonus: bonus
				};
			}
		default:
			return state;
	}
}