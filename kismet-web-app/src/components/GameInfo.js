import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameInfo extends Component {
	render() {
		return (
			<ul className='board-info'>
				<li>Round: {this.props.round}</li>
				<li>Turn: Player {this.props.turn}</li>
				<li>Rolls Left: {this.props.rolls_left}</li>
			</ul>
		);
	}
}

const mapStateToProps = state => ({
	round: state.board.round,
	turn: state.board.turn,
	rolls_left: state.board.rolls_left
})

export default connect(mapStateToProps)(GameInfo);