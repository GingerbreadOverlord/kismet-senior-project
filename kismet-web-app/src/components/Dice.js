import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDice, toggleHighlighted } from '../actions/boardActions';

class Dice extends Component {
	constructor(props) {
		super(props)
		this.onRoll = this.onRoll.bind(this);
		this.onToggle = this.onToggle.bind(this);
	}

	// returns a random die value between 1 and 6 inclusive
	roll() {
		return Math.floor(Math.random() * 6) + 1
	}

	// returns true if all dice are unhighlighted
	unhighlighted(arr) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i])
				return false;
		}

		return true;
	}

	onRoll() {
		var new_rolls = this.props.dice.slice()

		for (var i = 0; i < this.props.highlighted.length; i++) {
			if (this.props.highlighted[i]) 
				new_rolls[i] = this.roll();
		}

		this.props.toggleHighlighted(Array(5).fill(false)); // unhighlight all dice after a roll
		this.props.updateDice(new_rolls);
	}

	onToggle(n) {
		if (this.props.rolls_left == 0 || this.props.rolls_left == 3) // don't allow highlighting if rolls left == 0 or 3
			return;

		var highlighted = this.props.highlighted.slice();
		highlighted[n] = !highlighted[n];
		this.props.toggleHighlighted(highlighted);
	}

	render() {
		return (
			<div className='roll-area'>
				<button 
					className='roll-button'
					disabled={this.props.rolls_left != 3 && this.unhighlighted(this.props.highlighted) || !this.props.rolls_left} 
					onClick={this.onRoll}>Roll
				</button>
				<div className='all-dice-container'>
					{this.props.dice.map((dice_num, i) => {
						return (
							<div className='dice-container' key={i} onClick={() => this.onToggle(i)}>	
								{this.props.dice[i]}
							</div>
						)
					})}
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
	updateDice,
	toggleHighlighted
};

export default connect(mapStateToProps, mapDispatchToProps)(Dice);