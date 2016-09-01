import React from 'react';

class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: false,
			mark: null
		}
		this.number = Number(this.props.number);
		
		this.onCellClick = this.onCellClick.bind(this);
	}
	
	onCellClick() {
		this.setState({mark: this.props.token})
	}
	
	render() {
		return (
			<div className={this.props.column}
				id={this.props.number}
				onClick={this.onCellClick}> 
				{this.props.positions[this.props.number]}
			</div>
		);
	}
}

export default Cell;
