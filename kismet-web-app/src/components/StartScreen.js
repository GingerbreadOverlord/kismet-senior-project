import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gameType, toggleStartScreen } from '../actions/boardActions';
var net = require('net');

class StartScreen extends Component {
	constructor(props) {
		super(props);
		this.soloClick = this.soloClick.bind(this);
		this.twoPlayerLocalClick = this.twoPlayerLocalClick.bind(this);
		this.twoPlayerServerClick = this.twoPlayerServerClick.bind(this);
		this.serverOption = this.serverOption.bind(this);
	}

	soloClick() {
		this.selectOption('solo');
	}

	twoPlayerLocalClick() {
		this.selectOption('local');
	}

	twoPlayerServerClick() {
		this.selectOption('server');
	}

	selectOption(type) {
		this.props.gameType(type);
		this.props.toggleStartScreen(false);
	}

	serverOption() {

		var client = new net.Socket();
		client.connect(5004, '24.34.118.186', function() {
		    console.log('Connected');
		    client.write('Hello, server! Love, Client.');
		});

		client.on('data', function(data) {
		    console.log('Received: ' + data);
		    client.destroy(); // kill client after server's response
		});
	}

	render() {
		var tie = this.props.p1_total == this.props.p2_total;

		var winner = this.props.p1_total > this.props.p2_total ? 1 : 2;

		return (
			<div className='fill-screen-container'>
				<div className='fill-screen-center'>
					<div>Welcome to Kismet!</div>
					<div>How would you like to play the game?</div>
					<div className='start-options'>
						<button 
							className='restart-button'
							onClick={this.soloClick}
						>
						Solo
						</button>
						<button 
							className='restart-button'
							onClick={this.twoPlayerLocalClick}
						>
						2 Player (local)
						</button>
						<button 
							className='restart-button'
							onClick={this.twoPlayerServerClick}
						>
						2 player (server)
						</button>
						<button 
							className=''
							onClick={this.serverOption}
						>
						Send to server
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
