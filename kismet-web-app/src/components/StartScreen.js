import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gameType, toggleStartScreen } from '../actions/boardActions';
var net = require('net');

class StartScreen extends Component {
	constructor(props) {
		super(props);
		this.soloClick = this.soloClick.bind(this);
		this.twoPlayerLocalClick = this.twoPlayerLocalClick.bind(this);
	}

	soloClick() {
		this.selectOption('solo');
	}

	twoPlayerLocalClick() {
		this.selectOption('local');
	}

	selectOption(type) {
		this.props.gameType(type);
		this.props.toggleStartScreen(false);
	}

	render() {
		var tie = this.props.p1_total == this.props.p2_total;

		var winner = this.props.p1_total > this.props.p2_total ? 1 : 2;

		return (
			<div className='fill-screen-container'>
				<div className='fill-screen-center'>
					<div>Welcome to Kismet!</div>
					<div style={{height:"20px"}}></div>
					<div>How would you like to play the game?</div>
					<div style={{height:"20px"}}></div>
					<div className='start-options'>
						<button 
							className='restart-button'
							onClick={this.soloClick}
						>
						Solo
						</button>
						<div style={{width: '60px', color: 'transparent'}}>
						</div>
						<button 
							className='restart-button'
							onClick={this.twoPlayerLocalClick}
						>
						2 Player (local)
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = {
	gameType, toggleStartScreen
};

export default connect(() => {}, mapDispatchToProps)(StartScreen);
