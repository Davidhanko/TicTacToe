const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const htmlBoard = document.getElementsByClassName("board");
  console.log(htmlBoard);
  const getBoard = () => board;
  const setBoard = (index, index2, value) => (board[index][index2] = value);
  return { htmlBoard, getBoard, setBoard };
})();

const player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

const displayController = (() => {
  const displayBoard = () => {
    let board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        console.log(gameBoard.htmlBoard[0]);
        gameBoard.htmlBoard[i].children[j].textContent = board[i][j];
      }
    }
  };
  return { displayBoard };
})();
gameBoard.setBoard(0, 1, "X");

displayController.displayBoard();
