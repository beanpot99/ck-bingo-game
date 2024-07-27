function generateBoard() {
    const numCols = 5;
    const numRows = 5;

    // Initialize board with empty values
    const board = Array.from({ length: numCols }, () => Array(numRows).fill(null));
    const ranges = [
        { min: 1, max: 15 },  // B column
        { min: 16, max: 30 }, // I column
        { min: 31, max: 45 }, // N column
        { min: 46, max: 60 }, // G column
        { min: 61, max: 75 }  // O column
    ];

    // Fill columns with random numbers from specified ranges
    for (let col = 0; col < numCols; col++) {
        const numbers = Array.from({ length: ranges[col].max - ranges[col].min + 1 }, (_, i) => i + ranges[col].min);
        for (let row = 0; row < numRows; row++) {
            const index = Math.floor(Math.random() * numbers.length);
            board[col][row] = numbers.splice(index, 1)[0];
        }
    }

    board[2][2] = 'Free'; // Center is the Free space
    return board;
}

function generateBoards(numBoards) {
    const boards = [];
    const patterns = [
        [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], // B column
        [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]], // I column
        [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]], // N column
        [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]], // G column
        [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]], // O column
        [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], // Row 1
        [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]], // Row 2
        [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]], // Row 3
        [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]], // Row 4
        [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4]], // Row 5
        [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]], // Diagonal TL-BR
        [[4, 0], [3, 1], [2, 2], [1, 3], [0, 4]]  // Diagonal BL-TR
    ];

    while (boards.length < numBoards) {
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        const board = generateBoard();

        // Apply pattern and ensure all boards achieve Bingo on the 13th number
        const boardWithPattern = board.map(row => row.map(cell => (pattern.some(([r, c]) => r === row && c === cell)) ? 'X' : cell));
        console.log(boardWithPattern);
        if (containsBingo(boardWithPattern)) {
            boards.push(boardWithPattern);
        }
    }

    return boards;
}

function containsBingo(board) {
    const numRows = 5;
    const numCols = 5;

    // Check rows and columns for Bingo
    for (let i = 0; i < numRows; i++) {
        if (board[i].every(val => val === 'X') || board.map(row => row[i]).every(val => val === 'X')) {
            return true;
        }
    }

    // Check diagonals for Bingo
    if (Array.from({ length: numRows }, (_, i) => i).every(i => board[i][i] === 'X') ||
        Array.from({ length: numRows }, (_, i) => i).every(i => board[i][numCols - 1 - i] === 'X')) {
        return true;
    }

    return false;
}

const numberOfBoards = 25;
const bingoBoards = generateBoards(numberOfBoards);

console.log(`Generated ${bingoBoards.length} boards.`);
console.log(JSON.stringify(bingoBoards, null, 2));
