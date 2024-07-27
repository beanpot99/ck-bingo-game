function generateBoards() {
    const counter = createCounter();
    const numbers = [[5, 11, 14], [24, 17, 29], [41, 38, 40], [48, 59, 52], [70, 67]]

    // const horizontalWin = [[0, 2], [1, 2], [3, 2], [4, 2]]
    // const diagonalLeftTopToBottomRightWin = [[0, 0], [1, 1], [3, 3], [4, 4]]
    // const diagonalRightTopBottomLeftWin = [[4, 0], [3, 1], [1, 3], [0, 4]]

    const possibleWins = [[[0, 2], [1, 2], [3, 2], [4, 2]], [[0, 0], [1, 1], [3, 3], [4, 4]], [[4, 0], [3, 1], [1, 3], [0, 4]]];

    for (let i = 0; i < 26; i++) {
        let multidimensionalBoard = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 'Free', 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        const winIndex = counter(); //incrementing number 0, 1 or 2
        const winningMethod = possibleWins[winIndex]; //get the correct pattern for that win
        let magicNumberAdded = false;
        for (let j = 0; j < winningMethod.length; j++) {
            const array = winningMethod[j];
            const column = array[0]; //B, I, N, G or O
            if (magicNumberAdded === false && column === 3) {
                updateBoard(array[0], array[1], 52, multidimensionalBoard);
                magicNumberAdded = true;
            } else {
                const potentialValues = numbers[column];
                const numToInsert = getUniqueRandomNumber(potentialValues, column, multidimensionalBoard);
                updateBoard(array[0], array[1], numToInsert, multidimensionalBoard);
            }
        }
        fillInRemainingValues(multidimensionalBoard);
        console.log(multidimensionalBoard);
    }
}

function getRandomIntRange(min, max, row) {
    let num;
    do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (num == undefined || row.includes(num));
    return num;
}

function getUniqueRandomNumber(potentialValues, column, board) {
    let numIndex;
    let num;
    do {
        numIndex = randomNumer();
        num = potentialValues[numIndex];
    } while (board[column].includes(num) || num == undefined);
    return num;
}
//Returns either 0, 1, 2
function createCounter() {
    let count = 0;

    return function () {
        const result = count;
        if (count === 2) {
            count = 0;
        } else {
            count++;
        }
        return result;
    };
}

function randomNumer() {
    return Math.floor(Math.random() * 3);
}

function updateBoard(rowIndex, colIndex, number, board) {
    if (board[rowIndex][colIndex] < 1) {
        board[rowIndex][colIndex] = number;
    }
}

function fillInRemainingValues(board) {
    for (let i = 0; i < board.length; i++) { //loop through each row
        for (let j = 0; j < board[i].length; j++) {
            let numToInsert = getRandomIntRange(ranges[i][0], ranges[i][1], board[i]);
            updateBoard(i, j, numToInsert, board);
        }
    }
}

// function generateRangeArray(min, max) {
//     let rangeArray = [];
//     for(let i = min; i <=max; i ++) {
//         rangeArray.push(i);
//     }
//     return rangeArray;
// }

const ranges = [[1, 15], [16, 30], [31, 45], [46, 60], [61, 75]];

//generateBoards();

//[5, 24, 41, 48, 70, 11, 17, 38, 59, 67, 14, 29, 40, 52]
//B = 5, 11, 14
//I = 24, 17, 29
//N = Free, 41, 38, 40
//G = 48, 59, 52 ******
//O = 70, 67

// const board = updateBoard(0, 1, 34, multidimensionalBoard);


//1 create loop of number of total boards we want(25)
//2. call the counter method to generate eithe 0, 1 or 2 to determine how to win
//3. get the winning pattern via possibleWins[counterresponse]
//4. Iterate through the correct win array, for each array in that aray, the first index  will be used to obtain t


[
    [34, 83, 21, 36, 43],
    [75, 12, 42, 74, 48],
    [52, 24, 'Free', 19, 78],
    [51, 66, 67, 45, 18],
    [5, 13, 89, 31, 73]
];

generateBoards();






