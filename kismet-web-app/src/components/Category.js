import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateScore } from '../actions/scoreActions';
import { updateTurn } from '../actions/boardActions';

class Category extends Component {
	constructor(props) {
		super(props);	
		this.onClick = this.onClick.bind(this);
		this.blank = '    __';
	}

	onClick() {
		var sorted_dice = this.props.dice.slice().sort();
		var score = this.props.rule(sorted_dice);
		this.props.updateScore(this.props.player, score, this.props.cat);
		this.props.updateTurn();
	}

	render() {
		var which_cat = 
			this.props.player == 1 ? 
			(this.props.p1_cats[this.props.cat] == null ? this.blank : this.props.p1_cats[this.props.cat]) : 
			(this.props.p2_cats[this.props.cat] == null ? this.blank : this.props.p2_cats[this.props.cat]);

		var already_scored = 
			this.props.player == 1 ?
			(this.props.p1_cats[this.props.cat] == null ? false : true) :
			(this.props.p2_cats[this.props.cat] == null ? false : true);
		
		var style_p1 = { 'backgroundColor': '#0000EE' };
		var style_p2 = { 'backgroundColor': '#FF00FF' };

		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{which_cat}</td>
				<td>
					{(already_scored || this.props.player != this.props.turn || this.props.rolls_left == 3) ?
						null :
						<button 
							className='cat-button' 
							onClick={this.onClick}
							style={this.props.player == 1 ? style_p1 : style_p2}
						/>
					}
				</td>
			</tr>
		)
	}
}

const mapStateToProps = state => ({
	turn: state.board.turn,
	dice: state.board.dice,
	rolls_left: state.board.rolls_left,
	p1_cats: state.score.p1_categories,
	p2_cats: state.score.p2_categories
})

const mapDispatchToProps = {
	updateScore,
	updateTurn
};

export default connect(mapStateToProps, mapDispatchToProps)(Category)