import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import Dice from './Dice';

class Board extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.round == 16) 
			this.gameOver();
	}

	gameOver() {
		console.log("Game over!");
	}

	checkBonus() {
		
	}

	render() {
		return (
			<div className='board'>
				<div className='round-dummy'>
				Round: {this.props.round} <br /> 
				player {this.props.turn}'s turn <br />
				{this.props.rolls_left} rolls left 
				</div>	
				<div className='category-container'>			
					<Categories player={1}/>
					<Categories player={2}/>
				</div>
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
	dice: state.board.dice,
	rolls_left: state.board.rolls_left
})

export default connect(mapStateToProps)(Board);