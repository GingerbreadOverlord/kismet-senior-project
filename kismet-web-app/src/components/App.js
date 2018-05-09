import React, { Component } from 'react';
import Board from './Board';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import store from '../store.js';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dice: [0, 0, 0, 0, 0]
		}

		//this.getDice = this.getDice.bind(this);
	}

	getDice(dice) {
		//this.setState({dice: dice});
		return dice;
	}

	render() {
	return (
		<Provider store={store}>
			<Board />
		</Provider>
	);
	}
}

