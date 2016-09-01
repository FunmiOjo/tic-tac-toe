import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';

import Board from './components/Board';
import Cell from './components/Cell';
import PlayerForm from './components/PlayerForm';
import GameOutcome from './components/GameOutcome';

class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			playerToken: "X",
			computerToken: "O",
			currentToken: "O",
			availablePositions: [0, 1, 2, 3, 4, 5, 6, 7, 8],
			takenPositions: [null, null, null, null, null, null, null, null, null],
			playerPositions: [null, null, null, null, null, null, null, null, null],
			computerPositions: [null, null, null, null, null, null, null, null, null],
			outcome:""
		};
		
		this.winningPositions = [
			[0, 1, 2],
			[3, 4, 5], 
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		
		this.takeCellAction = this.takeCellAction.bind(this);
	}
	
	makeMove(position) {
		var cPos = this.state.computerPositions;
		var gPos = this.state.takenPositions;
		var apos = this.state.availablePositions;
				
		cPos[position] = this.state.computerToken;
		gPos[position] = this.state.computerToken;
		var newPosIndex = apos.indexOf(position);
		apos.splice(newPosIndex, 1);
		this.setState(
			{
				computerPositions: cPos,
				takenPositions: gPos,
				availablePositions: apos
			}
		);
	}
	
	computerPlay() {
		for (var i = 0; i < this.winningPositions.length; i++) {
			if (this.state.playerPositions[this.winningPositions[i][0]] !== null 
				&& this.state.playerPositions[this.winningPositions[i][1]] !== null
				&& this.state.takenPositions[this.winningPositions[i][2]] === null) {
					this.makeMove(this.winningPositions[i][2]);
					break;
			}

			else if (this.state.playerPositions[this.winningPositions[i][1]] !== null 
				&& this.state.playerPositions[this.winningPositions[i][2]] !== null
				&& this.state.takenPositions[this.winningPositions[i][0]] === null) {
					this.makeMove(this.winningPositions[i][0]);
					break;
			}

			else if (this.state.playerPositions[this.winningPositions[i][0]] !== null 
				&& this.state.playerPositions[this.winningPositions[i][2]] !== null
				&& this.state.takenPositions[this.winningPositions[i][1]] === null) {
					this.makeMove(this.winningPositions[i][1]);
					break;
			}

			else if (i === this.winningPositions.length - 1){
				if (this.state.takenPositions[4] === null) {
					this.makeMove(4);
					break
				} else {
					this.makeMove(this.state.availablePositions[0]);
					break;
				}
			}
		}
		
		if (this.checkWin(this.state.playerPositions)) {
			//display win message and restart game
			console.log("win");
			this.setState({outcome: "You won!"});
		}
		
		if (this.checkWin(this.state.computerPositions)) {
			//display lose message and restart game
			console.log("loss");
			this.setState({outcome: "You lost."});
		}
		
		if (this.checkTie()) {
			//display lose message and restart game
			console.log("tie");
			this.setState({outcome: "It's a tie."});
		}
		
	}
	
	takeCellAction(number) {
		this.setState({currentToken: this.state.playerToken}, () => {
			if (this.state.takenPositions[number] === null) {
				var pos = this.state.playerPositions;
				pos[number] = this.state.currentToken;
				var gPos = this.state.takenPositions;
				gPos[number] = this.state.currentToken;
				var tpos = this.state.takenPositions;
				tpos[number] = this.state.currentToken;
				
				var apos = this.state.availablePositions;
				var newPosIndex = apos.indexOf(number);
				apos.splice(newPosIndex, 1);
				
				this.setState({
					playerPositions: pos,
					availablePositions: apos,
					takenPositions: tpos
				}, this.computerPlay);	
			}
		});
	}
	
	checkWin(player) {
		
		function hasAllElements(matchingArr, arr) {
			for (var i = 0; i < matchingArr.length; i++) {
				if (arr[matchingArr[i]] === null) {
					return false;
				}
			}
			return true;
		}
		
		
		for (var i = 0; i < this.winningPositions.length; i++) {
			if (hasAllElements(this.winningPositions[i], player)) {
				return true;
			}
		}
		
		return false;
		
	}
	
	checkTie() {
		function hasPlayerAndComputerPos(winningArr, playerArr, compArr) {
			var hasPlayer = false;
			var hasComputer = false;
			
			for (var i = 0; i < winningArr.length; i++) {
				if (playerArr[winningArr[i]] !== null) {
					hasPlayer = true;
				}
				
				if (compArr[winningArr[i]] !== null) {
					hasComputer = true;
				}
			}
			
			return hasPlayer && hasComputer;
		}
		
		for (var i = 0; i < this.winningPositions.length; i++) {
			if (!hasPlayerAndComputerPos(this.winningPositions[i], this.state.playerPositions, this.state.computerPositions)) {
				return false;
			}
		}
		
		return true;
		
	}
	
	checkStatus() {
		if (this.checkWin(this.state.playerPositions)) {
			//display win message and restart game
			console.log("win");
			this.setState({outcome: "You won!"});
		}
		
		else if (this.checkWin(this.state.computerPositions)) {
			//display lose message and restart game
			console.log("loss");
			this.setState({outcome: "You lost."});
		}
		 
	}
	
	render() {
		return (
			<div className='wrapper'
				>
				<Board
					onCellSelect={this.takeCellAction}
					token={this.state.playerToken}
					positions={this.state.takenPositions}/>
				<GameOutcome
					outcome={this.state.outcome} />
				<h2>Choose player</h2>
				<PlayerForm />
				<h2 className='player'>You're {this.state.playerToken}</h2>
			
			</div>
		);
	}
		
}


ReactDOM.render(<App />, document.getElementById('app'));
