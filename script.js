const GAMEBOARD = (() => {
    const gameBoard = document.querySelector('.gameboard')
    gameBoard.style.width = '304px';
    gameBoard.style.height = '304px';
    let squares = [];

    const createGameBoard = () => {
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', `square${i}`);
            square.setAttribute('class', 'square');
            square.setAttribute('data-key', `${i}`)
            square.style.width = '100px';
            square.style.height = '100px';
            gameBoard.appendChild(square);
            squares.push('');
        }
    }

    return {createGameBoard, squares};
})();

const PLAYER = () => {
    const playerOne = {
        name: 'Player One',
        marker: 'X'
    };
    const playerTwo = {
        name: 'Player Two',
        marker: 'O'
    }

    return {playerOne, playerTwo};
}

const CONTROLLER = (() => {
    let statusDisplay = document.querySelector('.game-status');
    let gameActive = true;
    const playerOne = PLAYER().playerOne;
    const playerTwo = PLAYER().playerTwo;
    let currentPlayer = playerOne;
    let currentPlayerTurn = () => `It is ${currentPlayer.name}'s turn`;
    let winningMessage = () => `${currentPlayer.name} is victorious!`;
    let drawMessage = `Neither player is victorious.`;
    const squares = GAMEBOARD.squares;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const displayStatus = () => {
        statusDisplay.innerHTML = currentPlayerTurn();
    }

    const cellClick = (e) => {
        const index = e.target.dataset.key

        if(squares[index] != '' || !gameActive) {
            return
        }

        if(e.target.classList.contains('square')) {
            squares[index] = currentPlayer.marker
            e.target.innerHTML = currentPlayer.marker
        }

        handleResultValidation();
    }

    const handleResultValidation = () => {
        let roundWon = false;
        for(let i = 0; i <= 7; i++) {
            let winIndex = winningConditions[i];
            let a = squares[winIndex[0]];
            let b = squares[winIndex[1]];
            let c = squares[winIndex[2]];
            if(a === '' || b === '' || c === '') {
                continue;
            }
            if(a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if(roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }

        let roundDraw = !squares.includes('');

        if(roundDraw) {
            statusDisplay.innerHTML = drawMessage;
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        statusDisplay.innerHTML = currentPlayerTurn();
    }

    const handleResetGame = () => {
        let square = document.querySelectorAll('.square');
        for(let i = 0; i < 9; i++) {
            squares[i] = '';
        }
        square.forEach(item => item.innerHTML = '');
        currentPlayer = playerOne;
        displayStatus();
        gameActive = true;
    }

    document.body.addEventListener('click', cellClick);
    document.querySelector('.game-restart').addEventListener('click', handleResetGame)

    return {cellClick, displayStatus, handleResetGame};
})();


GAMEBOARD.createGameBoard();
CONTROLLER.displayStatus();