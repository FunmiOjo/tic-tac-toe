import React from 'react';

import Cell from './Cell';

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCell: null
		}
		this.onCellClick = this.onCellClick.bind(this);
	}
	
	onCellClick(cellNumber) {
		if(cellNumber) {
			this.props.onCellSelect(Number(cellNumber));
		}
		
	}
	
	render() {
		
		return (
			<div className='board'
				onClick={e => this.onCellClick(e.target.id)}
				>
				<div className='first-row'>
					<Cell column='first-column'
						number={0}
						token={this.props.token}
						positions={this.props.positions} />
					<Cell column='second-column'
						number={1}
						token={this.props.token}
						positions={this.props.positions} />
					<Cell column='third-column'
						number={2}
						token={this.props.token}
						positions={this.props.positions} />
				</div>
					
				<div className='second-row'>
					<Cell column='first-column'
						number={3}
						token={this.props.token}
						positions={this.props.positions} />
					<Cell column='second-column'
						number={4}
						token={this.props.token}
						positions={this.props.positions} />
					<Cell column='third-column'
						number={5}
						token={this.props.token}
						positions={this.props.positions} />
				</div>
					
				<div className='third-row'>
					<Cell column='first-column'
						number={6}
						token={this.props.token}
						positions={this.props.positions} />
					<Cell column='second-column'
						number={7}
						token={this.props.token}
						positions={this.props.positions} />
					<Cell column='third-column'
						number={8}
						token={this.props.token}
						positions={this.props.positions} />
				</div>
			</div>
		);
	}
}

export default Board;
