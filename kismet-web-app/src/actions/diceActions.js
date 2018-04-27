import { UPDATE_DICE, DEC_ROLLS, RESET_ROLLS } from './constants.js';

export const updateDice = values => ({
	type: UPDATE_DICE,
	roll_values: values
});

export const resetRolls = () => ({
	type: RESET_ROLLS
})