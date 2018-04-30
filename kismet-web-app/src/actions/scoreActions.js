import { UPDATE_SCORE } from './constants.js';

export const updateScore = (p1, score, cat) => ({
	type: UPDATE_SCORE,
	p1: p1,
	score: score,
	cat: cat
});