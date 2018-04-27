import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateScore } from '../actions/scoreActions';
import { updateTurn } from '../actions/boardActions';

class Category extends Component {
	constructor(props) {
		super(props);	
		this.onClick = this.onClick.bind(this);
		this.tryMove = this.tryMove.bind(this);
		this.blank = '    __';
	}

	onClick() {
		var sorted_dice = this.props.dice.slice().sort();
		var score = this.props.rule(sorted_dice);
		this.tryMove(score);
	}

	tryMove(score) {
		var p1 = this.props.player == 1;
		var updated_categories;
		updated_categories = p1 ? this.props.p1_cats.slice() : this.props.p2_cats.slice();
		updated_categories[this.props.cat] = score;
		updated_categories[15] += score;
		this.props.updateScore(p1, updated_categories);
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

		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{which_cat}</td>
				<td>
					<button 
						className='cat-button' 
						onClick={this.onClick}
						disabled={already_scored}
					/>
				</td>
			</tr>
		)
	}
}

const mapStateToProps = state => ({
	dice: state.board.dice,
	p1_cats: state.score.p1_categories,
	p2_cats: state.score.p2_categories
})

const mapDispatchToProps = {
	updateScore,
	updateTurn
};

export default connect(mapStateToProps, mapDispatchToProps)(Category)