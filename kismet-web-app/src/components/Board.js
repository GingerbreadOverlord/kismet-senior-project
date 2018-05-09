import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import Dice from './Dice';
import StartScreen from './StartScreen';
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
	}

	render() {
		return (
			<div className='board'>
				{this.props.start_screen ? <StartScreen /> : null}
				{this.props.game_over ? <GameOver /> : null}
				<div className='board-tools-container'>
					<GameInfo />
					<Dice />
				</div>
				<div className='category-container'>			
					<Categories player={1}/>
					{this.props.game_type == 'solo' ? null : <Categories player={2}/>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	game_type: state.board.game_type,
	p1_cats: state.score.p1_categories,
	p2_cats: state.score.p2_categories,
	dice: state.board.dice,
	game_over: state.board.game_over,
	start_screen: state.board.start_screen,
	rule_sheet: state.board.rule_sheet,
})

const mapDispatchToProps = {
	gameIsOver
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);