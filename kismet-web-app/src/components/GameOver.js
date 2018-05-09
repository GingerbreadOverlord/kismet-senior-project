import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetScores } from '../actions/scoreActions';
import { resetBoard } from '../actions/boardActions';

class GameOver extends Component {
	constructor(props) {
		super(props);
		this.restart = this.restart.bind(this);
	}

	restart() {
		this.props.resetScores();
		this.props.resetBoard();
	}

	render() {
		var tie = this.props.p1_total == this.props.p2_total;

		var winner = this.props.p1_total > this.props.p2_total ? 1 : 2;

		return (
			<div className='fill-screen-containerr'>
				<div className='fill-screen-center'>
					<div>{tie ? "It's a tie!" : winner == 1 ? "Player 1 wins!" : "Player 2 wins!"}</div>
					<div>{this.props.p1_total}  :  {this.props.p2_total}</div>
					<button 
						className='restart-button'
						onClick={this.restart}
					>
					Play Again
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	p1_total: state.score.p1_total,
	p2_total: state.score.p2_total,
	players: state.board.players
})

const mapDispatchToProps = {
	resetScores, resetBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
