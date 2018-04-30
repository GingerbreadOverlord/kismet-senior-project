import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import Dice from './Dice';
import GameOver from './GameOver';
import GameInfo from './GameInfo';
import { gameIsOver } from '../actions/boardActions';

class Board extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.round == 16) 
			this.props.gameIsOver();
		console.log(this.props.game_over);
	}

	render() {
		return (
			<div className='board'>
				{this.props.game_over ? <GameOver /> : null}
				<div className='board-tools-container'>
					<GameInfo />
					<Dice />
				</div>
				<div className='category-container'>			
					<Categories player={1}/>
					<Categories player={2}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	p1_cats: state.score.p1_categories,
	p2_cats: state.score.p2_categories,
	dice: state.board.dice,
	game_over: state.board.game_over
})

const mapDispatchToProps = {
	gameIsOver
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);