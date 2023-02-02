const gameBoard = () => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const setBoard = (index, value) => (board[index] = value);
  return { getBoard, setBoard };
};

const player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

displayController = () => {
  const displayBoard = () => {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      const cell = document.getElementById(i.toString());
      cell.textContent = board[i];
    }
  };
  return { displayBoard };
};
