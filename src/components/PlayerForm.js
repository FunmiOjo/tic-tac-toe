import React from 'react';

class PlayerForm extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<form>
				<label>X</label>
				<input name="X" className= 'x' type='radio' value='X'/>
				<label>O</label>
				<input className='o' type='radio' value='O'/>
			</form>
		);
	}
}

export default PlayerForm;
