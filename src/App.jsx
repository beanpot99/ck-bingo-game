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
    this.checkForBingo();
  }

  resetBoard() {
    const cells = this.bingoBoardRef.current.querySelectorAll('.bingo-cell');
    cells.forEach(cell => {
      if (cell.textContent !== 'Free') {
        cell.classList.remove('selected');
      }
    });
    this.bingoBoardRef.current.classList.remove('bingo-achieved'); // Reset the rainbow border effect
  }

  checkForBingo() {
    const board = this.state.board;
    const size = board.length;
    let rowBingo, colBingo, diag1Bingo = true, diag2Bingo = true;

    for (let i = 0; i < size; i++) {
      rowBingo = true;
      colBingo = true;

      for (let j = 0; j < size; j++) {
        const cell = document.querySelector(`.bingo-cell[data-row="${i}"][data-col="${j}"]`);
        if (!cell.classList.contains('selected')) rowBingo = false;
        if (!document.querySelector(`.bingo-cell[data-row="${j}"][data-col="${i}"]`).classList.contains('selected')) colBingo = false;
      }

      // Check diagonals only once
      const cellDiag1 = document.querySelector(`.bingo-cell[data-row="${i}"][data-col="${i}"]`);
      if (cellDiag1 && !cellDiag1.classList.contains('selected')) diag1Bingo = false;

      const cellDiag2 = document.querySelector(`.bingo-cell[data-row="${i}"][data-col="${size - 1 - i}"]`);
      if (cellDiag2 && !cellDiag2.classList.contains('selected')) diag2Bingo = false;

      if (rowBingo || colBingo) {
        this.bingoBoardRef.current.classList.add('bingo-achieved');
        return;
      }
    }

    // Check diagonals after loops
    if (diag1Bingo || diag2Bingo) {
      this.bingoBoardRef.current.classList.add('bingo-achieved');
      return;
    }

    this.bingoBoardRef.current.classList.remove('bingo-achieved');
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
                  className={`bingo-cell ${cell === 'Free' ? 'selected free' : ''}`}
                  onClick={(e) => this.handleCellClick(rowIndex, colIndex, e)}
                  data-row={rowIndex}
                  data-col={colIndex}
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
