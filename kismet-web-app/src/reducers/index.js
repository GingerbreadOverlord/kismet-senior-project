import { combineReducers } from 'redux';
import diceReducer from './diceReducer';
import scoreReducer from './scoreReducer';
import boardReducer from './boardReducer';

export default combineReducers({
	dice: diceReducer,
	score: scoreReducer,
	board: boardReducer
});