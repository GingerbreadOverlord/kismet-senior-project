import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateScore } from '../actions/scoreActions';

class Category extends Component {
	constructor(props) {
		super(props);	
		this.name = props.name;
		this.onClick = this.onClick.bind(this);
		this.attemptScore = this.attemptScore.bind(this);
		this.blank = '    __';
	}

	onClick() {
		//console.log(this.props);
		var sorted_dice = this.props.dice.slice().sort();
		var score = this.props.rule(sorted_dice);
		this.attemptScore(this.props.player == 1, this.props.cat, score);
	}

	attemptScore(p1, category, score) {
		if (p1) {
			if (this.props.p1_cats[category] == null) {
				var updated_categories = this.props.p1_cats.slice();
				updated_categories[category] = score;
				this.props.updateScore(p1, updated_categories);
			}
			else {
				console.log("Category already scored into")
			}
		}
		else {
			if (this.props.p2_cats[category] != null) {
				this.props.updateScore(p1, score);
			}
			else {
				console.log("Category already scored into")
			}
		}
	}

	render() {
		return (
			<tr onClick={this.onClick}>
				<td>{this.name}</td>
				<td>{this.props.player == 1 ? 
					(this.props.p1_cats[this.props.cat] == null ? this.blank : this.props.p1_cats[this.props.cat]) : 
					(this.props.p2_cats[this.props.cat] == null ? this.blank : this.props.p2_cats[this.props.cat])}</td>
			</tr>
		)
	}
}

const mapStateToProps = state => ({
	dice: state.dice.roll_values,
	p1_cats: state.score.p1_categories,
	p2_cats: state.score.p2_categories
})

const mapDispatchToProps = {
	updateScore
};

export default connect(mapStateToProps, mapDispatchToProps)(Category)