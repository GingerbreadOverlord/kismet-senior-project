import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import Dice from './Dice';

class Board extends Component {
	render() {
		return (
			<div className='board'>
				<Categories getDice={this.getDice}/>
			    <Dice getDice={this.getDice}/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	p1_cats: state.score.p1_categories,
	p2_cats: state.score.p2_categories,
	dice: state.dice.roll_values
})

export default connect(mapStateToProps)(Board);