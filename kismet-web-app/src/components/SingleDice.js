import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleHighlighted } from '../actions/boardActions';

class SingleDice extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		if (this.props.rolls_left == 3 || this.props.rolls_left == 0)
			return;

		this.props.toggleHighlighted(this.props.num);
	}

	render() {
	// base code taken from https://github.com/AdamTyler/react-dice-complete/blob/master/src/Die.js
    // face styles
    let faceStyle = {
      background: this.props.faceColor,
      outline: this.props.highlighted[this.props.num] ? `${this.props.dieSize/30}px solid ${this.props.outlineColor}` : 'none',
      height: `${this.props.dieSize}px`,
      position: 'absolute',
      width: `${this.props.dieSize}px`,
    }
    
    // dot styles
    let dotSize = this.props.dieSize / 6 - 2;

    let dotStyle = {
      background: this.props.dotColor,
      height: `${ dotSize }px`,
      width: `${ dotSize }px`
    }

    let d1Style = { top: `${this.props.dieSize/6}px`, left: `${this.props.dieSize/6}px` }
    let d2Style = { top: `${this.props.dieSize/6}px`, right: `${this.props.dieSize/6}px` }
    let d3Style = { top: `${this.props.dieSize/2 - dotSize/2}px`, left: `${this.props.dieSize/6}px` }
    let d4Style = { top: `${this.props.dieSize/2 - dotSize/2}px`, left: `${this.props.dieSize/2 - dotSize/2}px` }
    let d5Style = { top: `${this.props.dieSize/2 - dotSize/2}px`, right: `${this.props.dieSize/6}px` }
    let d6Style = { bottom: `${this.props.dieSize/6}px`, left: `${this.props.dieSize/6}px` }
    let d7Style = { bottom: `${this.props.dieSize/6}px`, right: `${this.props.dieSize/6}px` }
    
    // container styles
    let containerStyle = {
      margin: `${this.props.margin}px`,
      display: 'inline-block'
    }

    return (
		<div className="die-container" style={containerStyle}>
			<div className="die" ref={die => this.die = die} onClick={this.onClick}>
				{this.props.dice[this.props.num] == 5 ?
				<div style={faceStyle}>
					<span className="dot" style={Object.assign({}, dotStyle, d1Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d2Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d4Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d6Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d7Style)}></span>
				</div> : this.props.dice[this.props.num] == 6 ? 
				<div style={faceStyle}>
					<span className="dot" style={Object.assign({}, dotStyle, d1Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d2Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d3Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d5Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d6Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d7Style)}></span>
				</div>  : this.props.dice[this.props.num] == 1 ? 
				<div style={faceStyle}>
					<span className="dot" style={Object.assign({}, dotStyle, d4Style)}></span>
				</div> :  this.props.dice[this.props.num] == 2 ? 
				<div style={faceStyle}>
					<span className="dot" style={Object.assign({}, dotStyle, d2Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d6Style)}></span>
				</div>  : this.props.dice[this.props.num] == 3 ?
				<div style={faceStyle}>
					<span className="dot" style={Object.assign({}, dotStyle, d2Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d4Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d6Style)}></span>
				</div> :
				<div style={faceStyle}>
					<span className="dot" style={Object.assign({}, dotStyle, d1Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d2Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d6Style)}></span>
					<span className="dot" style={Object.assign({}, dotStyle, d7Style)}></span>
				</div>}
			</div>
		</div>
    )
  }
}

const mapStateToProps = state => ({
	dice: state.board.dice,
	rolls_left: state.board.rolls_left,
	highlighted: state.board.highlighted
})

const mapDispatchToProps = {
	toggleHighlighted
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleDice);