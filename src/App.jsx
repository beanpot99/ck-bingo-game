import React, { Component } from 'react';
import './App.css';

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

  // Function to generate a new bingo board
  generateBingoBoard() {
    const bingoBoard = [];

    // Create a 5x5 grid
    for (let row = 0; row < 5; row++) {
      const rowData = [];
      for (let col = 0; col < 5; col++) {
        // The center cell is marked as "Free"
        if (row === 2 && col === 2) {
          rowData.push('Free');
        } else {
          // Generate random numbers for other cells
          rowData.push(this.generateRandomNumber());
        }
      }
      bingoBoard.push(rowData);
    }

    return bingoBoard;
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
        <button className="button" onClick={() => this.resetBoard()}>Reset</button>
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
      </div>
    );
  }
}

export default App;
