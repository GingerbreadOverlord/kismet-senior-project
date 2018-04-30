import { UPDATE_SCORE, RESET_SCORES } from './constants.js';

export const updateScore = (p1, score, cat) => ({
	type: UPDATE_SCORE,
	p1: p1,
	score: score,
	cat: cat
});

export const resetScores = () => ({
	type: RESET_SCORES
})