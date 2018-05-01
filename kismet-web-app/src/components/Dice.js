import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SingleDice from './SingleDice';
import 'react-dice-complete/dist/react-dice-complete.css';
import { rollDice } from '../actions/boardActions';

class Dice extends Component {
	constructor(props) {
		super(props)
		this.onRoll = this.onRoll.bind(this);
	}

	// returns true if any dice are highlighted (true)
	anyHighlighted(arr) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i])
				return true;
		}

		return false;
	}

	onRoll() {
		this.props.rollDice();
	}

	render() {
		var black = "#000000";
		var white = "#FFFFFF";
		var pink_highlight = '#ff69b4';

		var diceStyle = { 
			outline: false,
		    outlineColor: pink_highlight,
		    dieSize: 60,
		    disableIndividual: false,
		    margin: 15,
		    numDice: 1,
		    sides: 6,
		    rollTime: 0,
		    faceColor: black,
		    dotColor: white 
		}

		return (
			<div className='roll-area'>
				<button 
					className='roll-button'
					disabled={!this.props.rolls_left || !this.anyHighlighted(this.props.highlighted)} 
					onClick={this.onRoll}
				>
					{this.props.rolls_left == 3 ? 'Roll' : ' Reroll'}
				</button>
				<div className='dice-row'>
					<SingleDice {...diceStyle} num={0}/>
					<SingleDice {...diceStyle} num={1}/>
					<SingleDice {...diceStyle} num={2}/>
				</div>
				<div className='dice-row'>
					<SingleDice {...diceStyle} num={3}/>
					<SingleDice {...diceStyle} num={4}/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dice: state.board.dice,
	highlighted: state.board.highlighted,
	rolls_left: state.board.rolls_left
});

const mapDispatchToProps = {
	rollDice
};

export default connect(mapStateToProps, mapDispatchToProps)(Dice);