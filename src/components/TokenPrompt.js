import React from 'react';
import './styles/app.css';


class TokenPrompt extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<h2>Choose your token</h2>
				<form>
					<input type='select'>
					<input type='submit'>
				</form>
			</div>
		);
	}
}

export default TokenPrompt;
