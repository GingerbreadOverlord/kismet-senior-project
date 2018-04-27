import { combineReducers } from 'redux';
import scoreReducer from './scoreReducer';
import boardReducer from './boardReducer';

export default combineReducers({
	score: scoreReducer,
	board: boardReducer
});