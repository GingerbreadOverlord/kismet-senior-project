import { combineReducers } from 'redux';
import diceReducer from './diceReducer';
import scoreReducer from './scoreReducer';

export default combineReducers({
	dice: diceReducer,
	score: scoreReducer
});