import React, { Component } from 'react';

import Categories from './Categories';
import Dice from './Dice';

export default class Board extends Component {
	render() {
		return (
			<div className='board'>
				<Categories getDice={this.getDice}/>
			    <Dice getDice={this.getDice}/>
			</div>
		);
	}
}
