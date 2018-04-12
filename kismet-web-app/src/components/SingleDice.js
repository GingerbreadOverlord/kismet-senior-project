import React, { Component } from 'react';

export default class SingleDice extends Component {
	constructor(props) {
		super(props);

		this.state = {
			num: 1
		}

		this.roll = this.roll.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.onRoll);
	}

	componentDidMount() {
		this.roll()
	}

	roll() {
		this.setState({num: Math.floor(Math.random() * 6) + 1})
	}

	render() {
		return ( 
			<div className='dice-container' onClick={this.roll}>	
				{this.state.num}
			</div>
		)
	}
}