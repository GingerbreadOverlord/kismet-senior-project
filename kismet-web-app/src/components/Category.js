import React, { Component } from 'react';

export default class Category extends Component {
	constructor(props) {
		super(props);

		this.state = {
			score: 0,
			scoredInto: false
		}
		
		this.name = props.name;
		this.applyRule = this.applyRule.bind(this);
	}

	applyRule() {
		if (this.state.scoredInto)
			this.props.attemptScore(-1);
		else {
			var dice = this.props.getDice();
			console.log(dice);
			var score = this.props.rule(dice);
			this.setState({score: score, scoredInto: true});
			this.props.attemptScore(score);
		}
	}

	render() {
		return (
			<tr onClick={this.applyRule}>
				<td>{this.name}</td>
				<td>{this.state.score}</td>
			</tr>
		)
	}
}