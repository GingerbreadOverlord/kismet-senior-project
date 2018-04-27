import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import Dice from './Dice';

class Board extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.round == 16) 
			this.gameOver()
	}

	gameOver() {
		console.log("Game over!");
	}

	render() {
		return (
			<div className='board'>
				<div className='round-dummy'>
				Round: {this.props.round} --- 
				player {this.props.turn + 1}'s turn
				</div>				
				<Categories />
			    <Dice />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	round: state.board.round,
	turn: state.board.turn,
	p1_cats: state.score.p1_categories,
	p2_cats: state.score.p2_categories,
	dice: state.board.dice
})

export default connect(mapStateToProps)(Board);