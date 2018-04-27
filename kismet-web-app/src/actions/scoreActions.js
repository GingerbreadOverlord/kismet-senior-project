import { UPDATE_SCORE } from './constants.js';

export const updateScore = (p1, categories) => ({
	type: UPDATE_SCORE,
	p1: p1,
	updated_categories: categories
});