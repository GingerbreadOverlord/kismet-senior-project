import React, { Component } from 'react';
import { connect } from 'react-redux';

class BonusAndTotal extends Component {
	constructor(props) {
		super(props);	
	}

	render() {
		var value = this.props.player == 1 ? 
			(this.props.name == 'Bonus' ? this.props.p1_bonus : this.props.p1_total) :
			(this.props.name == 'Bonus' ? this.props.p2_bonus : this.props.p2_total)

		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{value}</td>
			</tr>
		)
	}
}

const mapStateToProps = state => ({
	p1_bonus: state.score.p1_bonus,
	p2_bonus: state.score.p2_bonus,
	p1_total: state.score.p1_total,
	p2_total: state.score.p2_total
})

export default connect(mapStateToProps)(BonusAndTotal);