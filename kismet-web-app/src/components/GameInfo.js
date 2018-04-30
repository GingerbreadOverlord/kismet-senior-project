import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameInfo extends Component {
	render() {
		return (
			<div></div>
		);
	}
}

const mapStateToProps = state => ({
	round: state.board.round,
	turn: state.board.turn,
	rolls_left: state.board.rolls_left
})

export default connect(mapStateToProps)(GameInfo);