const MIN_MATCH_TO_WIN = 4;
const COLUMNS = 7;
const LINES = 6;

let currentCol;
let gameBoard
let gameOver = false;

let playerRed = 'Red';
let playerBlue = 'Blue';
let currentPlayer = playerBlue;

window.onload = function () {
    createGameBoard();
}

function createGameBoard() {
    gameBoard = [];
    currentCol = [5, 5, 5, 5, 5, 5, 5];
    for (let l = 0; l < LINES; ++l) {
        let line = [];
        for (let c = 0; c < COLUMNS; ++c) {
            line.push(' ');
            let cell = document.createElement('div');
            cell.id = l.toString() + "-" + c.toString();
            cell.classList.add('cell');
            cell.addEventListener("click", makeMove);
            document.getElementById('gameBoard').append(cell);
        }
        gameBoard.push(line);
    }
}

function makeMove() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-");
    let l = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    l = currentCol[c];
    if (l < 0) {
        return;
    }
    gameBoard[l][c] = currentPlayer;
    let cell = document.getElementById(l.toString() + "-" + c.toString());
    if (currentPlayer == playerBlue) {
        cell.classList.add("blue-piece");
        currentPlayer = playerRed; 4
    } else {
        cell.classList.add("red-piece");
        currentPlayer = playerBlue;
    }
    --l;
    currentCol[c] = l;

    checkLines();
    checkColumns();
    checkMainDiagonalParallels();
    checkSecondaryDiagonalParallels()
}


function checkLines() {
    for (let l = 0; l < LINES; ++l) {
        for (let c = 0; c < COLUMNS - 3; ++c) {
            if (gameBoard[l][c] != ' ') {
                let consecutiveCounter = 1;
                while (consecutiveCounter < MIN_MATCH_TO_WIN && c + consecutiveCounter < COLUMNS
                    && gameBoard[l][c] === gameBoard[l][c + consecutiveCounter]) {
                    ++consecutiveCounter;
                }
                if (consecutiveCounter === MIN_MATCH_TO_WIN) {
                    setWinner(l, c);
                    return;
                }
            }
        }
    }
}

function checkColumns() {
    for (let c = 0; c < COLUMNS; ++c) {
        for (let l = 0; l < LINES - 2; ++l) {
            if (gameBoard[l][c] != ' ') {
                let consecutiveCounter = 1;
                while (consecutiveCounter < MIN_MATCH_TO_WIN && l + consecutiveCounter < LINES
                    && gameBoard[l][c] === gameBoard[l + consecutiveCounter][c]) {
                    ++consecutiveCounter;
                }
                if (consecutiveCounter === MIN_MATCH_TO_WIN) {
                    setWinner(l, c);
                    return;
                }
            }
        }
    }
}

function checkMainDiagonalParallels() {
    for (let l = 0; l < LINES - 3; ++l) {
        for (let c = 0; c < COLUMNS - 3; ++c) {
            if (gameBoard[l][c] != ' ') {
                let consecutiveCounter = 1;
                while (consecutiveCounter < MIN_MATCH_TO_WIN && l + consecutiveCounter < LINES && c + consecutiveCounter < COLUMNS
                    && gameBoard[l][c] === gameBoard[l + consecutiveCounter][c + consecutiveCounter]) {
                    ++consecutiveCounter;
                }
                if (consecutiveCounter === MIN_MATCH_TO_WIN) {
                    setWinner(l, c);
                    return;
                }
            }
        }
    }
}

function checkSecondaryDiagonalParallels() {
    for (let l = 0; l < LINES - 3; ++l) {
        for (let c = 3; c < COLUMNS; ++c) {
            if (gameBoard[l][c] != ' ') {
                let consecutiveCounter = 1;
                while (consecutiveCounter < MIN_MATCH_TO_WIN && l + consecutiveCounter < LINES && c - consecutiveCounter > 0
                    && gameBoard[l][c] === gameBoard[l + consecutiveCounter][c - consecutiveCounter]) {
                    ++consecutiveCounter;
                }
                if (consecutiveCounter === MIN_MATCH_TO_WIN) {
                    setWinner(l, c);
                    return;
                }
            }
        }
    }
}

function setWinner(l, c) {
    let winner = document.getElementById('winner');
    if (gameBoard[l][c] === playerBlue) {
        document.getElementById("game-over").style.display = "block";
        winner.textContent = "🔵Blue wins!";
    } else {
        document.getElementById("game-over").style.display = "block";
        winner.textContent = "🔴Red wins!";
    }
    gameOver = true;
}

function refresh() {
    window.location.reload();
}
