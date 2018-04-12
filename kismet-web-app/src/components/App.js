import React, { Component } from 'react';
import Dice from './Dice.js';
import Categories from './Categories.js';

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
	  <div className='app'>
	  	<Categories getDice={this.getDice}/>
	    <Dice getDice={this.getDice}/>
	  </div>
	);
	}
}

