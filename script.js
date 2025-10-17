const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        } 
        return false;
    };

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return {getBoard, setMark, reset};
})();

const Player = (name, mark) => {
    return {name, mark };
};

const gameControl = (() => {
    let player1 = Player("Player X", "X");
    let player2 = Player("Player O", "O");
    let currentPlayer = player1;
    let gameOver = false;

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    const checkWinner = (board) => {
        for (let condition of winConditions) {
            if (condition.every(index => board[index] === currentPlayer.mark)) {
                return condition;
            }
        }
        return null;    
    };



    const drawGame = (board) => board.every(cell => cell !== "");

    const endGame = (message) => {
        DisplayController.setMessage(message);
        gameOver = true;
        DisplayController.render();
    };

    const playRound = (index) => {
        if (gameOver) return;
        if (!Gameboard.setMark(index, currentPlayer.mark)) return;

        const board = Gameboard.getBoard();

        if (checkWinner(board)) {
            endGame(`${currentPlayer.name} wins!`);
        } else if (drawGame(board)) {
            endGame("It's a draw.");
        } else {
            switchPlayer();
            DisplayController.setMessage(`${currentPlayer.name}'s turn.`)
            DisplayController.render();
        }    
    };


    const restart = () => {
        Gameboard.reset();
        currentPlayer = player1;
        gameOver = false;
        DisplayController.setMessage(`${currentPlayer.name}'s turn.`);
        DisplayController.render();
    };

return { playRound, restart, getCurrentPlayer }
})();


const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const message = document.querySelector(".msg");
    const resetBtn = document.querySelector(".reset-btn");

    const  render = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const setMessage = (msg) => {
        message.textContent = msg;
    };

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            const index = cell.dataset.index;
            gameControl.playRound(index);
        });
    });

    resetBtn.addEventListener("click", () => {
        gameControl.restart();
    });

    render();

    return {render, setMessage};

})();