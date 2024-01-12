import React, { Component } from 'react';
import './App.css';
import { predefinedBoards } from './utils';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.generateBingoBoard(),
    };
    this.bingoBoardRef = React.createRef();
  }
  //12 initial numbers: 7, 12, 19, 23, 31, 36, 41, 52, 58, 63, 69, 74
  //13th number: 45
  componentDidMount() {
    // Generate a new bingo board when the component mounts
    this.resetBoard();
  }

  generateBingoBoard() {
    // Randomly select one of the predefined boards
    const randomIndex = Math.floor(Math.random() * predefinedBoards.length);
    return predefinedBoards[randomIndex];
  }
  generateRandomNumber() {
    return Math.floor(Math.random() * 75) + 1;
  }

  handleCellClick(row, col, event) {
    // Avoid toggling the "Free" cell
    if (this.state.board[row][col] === 'Free') {
      return;
    }

    // Toggle the 'selected' class on the clicked cell
    const cellElement = event.currentTarget;
    cellElement.classList.toggle('selected');
  }

  // Function to reset the bingo board
  resetBoard() {
    const cells = this.bingoBoardRef.current.querySelectorAll('.bingo-cell');
    cells.forEach(cell => {
      if (cell.textContent !== 'Free') {
        cell.classList.remove('selected');
      }
    });
  }
  render() {
    return (
      <div>
        <div className="bingo-board" ref={this.bingoBoardRef}>
          {this.state.board.map((row, rowIndex) => (
            <div className="bingo-row" key={rowIndex}>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`bingo-cell ${cell === 'Free' ? 'selected' : ''}`}
                  onClick={(e) => this.handleCellClick(rowIndex, colIndex, e)}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="button" onClick={() => this.resetBoard()}>Reset</button>
      </div>
    );
  }
}

export default App;
