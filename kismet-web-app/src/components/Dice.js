import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';
import { updateDice, nextRoll, refreshDice, makeCall } from '../actions/boardActions';

class Dice extends Component {
	constructor(props) {
		super(props)
		this.onRoll = this.onRoll.bind(this);
		this.diceOneCallback = this.diceOneCallback.bind(this);
		this.diceTwoCallback = this.diceTwoCallback.bind(this);
		this.diceThreeCallback = this.diceThreeCallback.bind(this);
		this.diceFourCallback = this.diceFourCallback.bind(this);
		this.diceFiveCallback = this.diceFiveCallback.bind(this);

		this.state = {
			disabled: false // to offset the time in between dice rolling for first roll
		}
	}

	// returns a random die value between 1 and 6 inclusive
	roll() {
		return Math.floor(Math.random() * 6) + 1
	}

	// returns true if all dice are disabled
	allEnabled(arr) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i])
				return false;
		}

		return true;
	}

	onRoll() {
		if (this.props.rolls_left == 3) {
			this.setState({disabled: true});
			this.dice1.rollAll();
			this.dice2.rollAll();
			this.dice3.rollAll();
			this.dice4.rollAll();
			this.dice5.rollAll();
		}
		else
			this.props.nextRoll();
	}

	diceOneCallback(num) {
		if (this.props.initial_calls >= 10) { // hack to offset callbacks being called on render
			this.props.updateDice(num, 0);
			this.setState({disabled: false});
		}
		else if (this.props.initial_calls >= 5) {
			this.props.makeCall();
			this.props.updateDice(num, 0);
		}
		else {
			this.props.makeCall();
		}
	}

	diceTwoCallback(num) {
		if (this.props.initial_calls >= 10) { // hack to offset callbacks being called on render
			this.props.updateDice(num, 1);
			this.setState({disabled: false});
		}
		else if (this.props.initial_calls >= 5) {
			this.props.makeCall();
			this.props.updateDice(num, 1);
		}
		else {
			this.props.makeCall();
		}
	}

	diceThreeCallback(num) {
		if (this.props.initial_calls >= 10) { // hack to offset callbacks being called on render
			this.props.updateDice(num, 2);
			this.setState({disabled: false});
		}
		else if (this.props.initial_calls >= 5) {
			this.props.makeCall();
			this.props.updateDice(num, 2);
		}
		else {
			this.props.makeCall();
		}
	}

	diceFourCallback(num) {
		if (this.props.initial_calls >= 10) { // hack to offset callbacks being called on render
			this.props.updateDice(num, 3);
			this.setState({disabled: false});
		}
		else if (this.props.initial_calls >= 5) {
			this.props.makeCall();
			this.props.updateDice(num, 3);
		}
		else {
			this.props.makeCall();
		}
	}

	diceFiveCallback(num) {
		if (this.props.initial_calls >= 10) { // hack to offset callbacks being called on render
			this.setState({disabled: false});
			this.props.updateDice(num, 4);
		}
		else if (this.props.initial_calls >= 5) {
			this.props.makeCall();
			this.props.updateDice(num, 4);
			this.props.nextRoll(); // only one of the die needs to call this on the first roll
		}
		else {
			this.props.makeCall();
		}
	}

	render() {
		var black = "#000000";
		var white = "#FFFFFF";

		return (
			<div className='roll-area'>
				<button 
					className='roll-button'
					disabled={!this.props.rolls_left || this.state.disabled || (this.allEnabled(this.props.disabled) && this.props.rolls_left != 3)} 
					onClick={this.onRoll}
				>
					{this.props.rolls_left == 3 ? 'Roll' : 'Refresh Roll'}
				</button>
				<div className='dice-row'>
					<ReactDice
						numDice={1}
						rollDone={this.diceOneCallback}
						faceColor={black}
						dotColor={white}
						rollTime={this.props.roll_time}
						ref={dice => this.dice1 = dice}
						disableIndividual={!this.props.rolls_left || this.props.disabled[0]}
					/>
					<ReactDice 
						numDice={1}
						rollDone={this.diceTwoCallback}
						faceColor={black}
						dotColor={white}
						rollTime={this.props.roll_time}
						ref={dice => this.dice2 = dice}
						disableIndividual={!this.props.rolls_left || this.props.disabled[1]}
					/>
					<ReactDice 
						numDice={1}
						rollDone={this.diceThreeCallback}
						faceColor={black}
						dotColor={white}
						rollTime={this.props.roll_time}
						ref={dice => this.dice3 = dice}
						disableIndividual={!this.props.rolls_left || this.props.disabled[2]}
					/>
				</div>
				<div className='dice-row'>
					<ReactDice 
						numDice={1}
						rollDone={this.diceFourCallback}
						faceColor={black}
						dotColor={white}
						rollTime={this.props.roll_time}
						ref={dice => this.dice4 = dice}
						disableIndividual={!this.props.rolls_left || this.props.disabled[3]}
					/>
					<ReactDice 
						numDice={1}
						rollDone={this.diceFiveCallback}
						faceColor={black}
						dotColor={white}
						rollTime={this.props.roll_time}
						ref={dice => this.dice5 = dice}
						disableIndividual={!this.props.rolls_left || this.props.disabled[4]}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	roll_time: state.board.roll_time,
	initial_calls: state.board.initial_calls,
	disabled: state.board.disabled,
	dice: state.board.dice,
	highlighted: state.board.highlighted,
	rolls_left: state.board.rolls_left
});

const mapDispatchToProps = {
	updateDice,
	nextRoll,
	refreshDice,
	makeCall
};

export default connect(mapStateToProps, mapDispatchToProps)(Dice);

/*
{this.props.dice.map((dice_num, i) => {
						return (
							<div className='dice-container' key={i} onClick={() => this.onToggle(i)}>	
								{this.props.dice[i]}
							</div>
						)
					})}*/