import React, { Component } from 'react';

export default class Category extends Component {
	constructor(props) {
		super(props);	
		this.name = props.name;

		this.state = {
			score: this.props.score
		}

		this.onClick = this.onClick.bind(this);
	}

	componentWillReceiveProps() {
		this.setState({score: this.props.score});
	}

	onClick() {
		
	}

	render() {
		return (
			<tr onClick={this.onClick}>
				<td>{this.name}</td>
				<td>{this.state.score}</td>
			</tr>
		)
	}
}