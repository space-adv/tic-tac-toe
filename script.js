const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }else {
            return false;
        };
    };

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return {getBoard, setMark, reset};
})();

const Player = (name, mark) => {
    return {name, mark };
};