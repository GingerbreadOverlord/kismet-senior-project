import React, { Component } from 'react';

export default class Dice extends Component {
	constructor(props) {
		super(props)

		this.state = {
			timesRolled: 0,
			diceRolled: [0, 0, 0, 0, 0],
			highlighted: [1, 1, 1, 1, 1]
		}

		this.dice = [1, 2, 3, 4, 5];
		this.updateDice = this.updateDice.bind(this);
	}


	roll() {
		return Math.floor(Math.random() * 6) + 1
	}

	updateDice(highlighted) {
		var new_rolls = this.state.diceRolled.slice();
		for (var i = 0; i < highlighted.length; i++) {
			if (highlighted[i] == 1) {
				new_rolls[i] = this.roll();
			}
		}

		var sorted_dice = new_rolls.slice();
		sorted_dice.sort();
		this.props.getDice(sorted_dice);
		this.setState({diceRolled: new_rolls})
	}

	render() {
		return (
			<div className='roll-area'>
				<div className='roll-button' onClick={() => {this.updateDice(this.state.highlighted)}}>Roll</div>
				<div className='all-dice-container'>
					{this.dice.map((dice_num, i) => {
						return (
							<div className='dice-container' key={i}>	
								{this.state.diceRolled[i]}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}