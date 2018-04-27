import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDice } from '../actions/boardActions';

class Dice extends Component {
	constructor(props) {
		super(props)

		this.state = {
			highlighted: Array(5).fill(true)
		}

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
		var new_rolls = [1, 1, 1, 1, 1];

		for (var i = 0; i < this.state.highlighted.length; i++) {
			if (this.state.highlighted[i]) 
				new_rolls[i] = this.roll();
			else
				new_rolls[i] = this.props.roll_values[i];
		}

		
		this.setState({highlighted: Array(5).fill(false)}) // unhighlight all dice after a roll
		this.props.updateDice(new_rolls);
	}

	onToggle(n) {
		if (!this.props.rolls_left) // don't allow highlighting if rolls left == 0
			return;

		var highlighted = this.state.highlighted.slice();
		highlighted[n] = !highlighted[n];
		this.setState({highlighted: highlighted});
	}

	render() {
		return (
			<div className='roll-area'>
				<button 
					className='roll-button'
					disabled={this.unhighlighted(this.state.highlighted) || !this.props.rolls_left} 
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
	rolls_left: state.board.rolls_left
});

const mapDispatchToProps = {
	updateDice
};

export default connect(mapStateToProps, mapDispatchToProps)(Dice);