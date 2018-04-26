import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDice } from '../actions/diceActions';

class Dice extends Component {
	constructor(props) {
		super(props)

		this.state = {
			timesRolled: 0,
			highlighted: [true, true, true, true, true]
		}

		this.dice = [1, 2, 3, 4, 5];
		this.onClick = this.onClick.bind(this);
		this.onToggle = this.onToggle.bind(this);
	}


	roll() {
		return Math.floor(Math.random() * 6) + 1
	}

	onClick() {
		var new_rolls = [1, 1, 1, 1, 1];

		for (var i = 0; i < this.state.highlighted.length; i++) {
			if (this.state.highlighted[i]) 
				new_rolls[i] = this.roll();
			else
				new_rolls[i] = this.props.roll_values[i];
		}

		this.props.updateDice(new_rolls);
	}

	onToggle(n) {
		var highlighted = this.state.highlighted.slice();
		highlighted[n] = !highlighted[n];
		console.log(highlighted);
		this.setState({highlighted: highlighted});
	}

	render() {
		return (
			<div className='roll-area'>
				<div className='roll-button' onClick={this.onClick}>Roll</div>
				<div className='all-dice-container'>
					{this.dice.map((dice_num, i) => {
						return (
							<div className='dice-container' key={i} onClick={() => this.onToggle(i)}>	
								{this.props.roll_values[i]}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	roll_values: state.dice.roll_values
});

//const mapDispatchToProps = dispatch => {
//	return {
//		updateDice: bindActionCreators(updateDice, dispatch)
//	};
//}

const mapDispatchToProps = {
	updateDice
};

export default connect(mapStateToProps, mapDispatchToProps)(Dice);