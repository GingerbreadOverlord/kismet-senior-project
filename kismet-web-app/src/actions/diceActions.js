import { UPDATE_DICE } from './constants.js';

export const updateDice = values => ({
	type: UPDATE_DICE,
	roll_values: values
});