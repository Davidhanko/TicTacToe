let lastMove = "O";
let playerTurn = "X";

const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const htmlBoard = document.getElementsByClassName("board");
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
        gameBoard.htmlBoard[i].children[j].addEventListener("click", (e) => {
          const element = e.target;
          const symbol = gameLogic.displaySymbol();
          showSymbol(symbol, element);
          gameBoard.setBoard(i, j, symbol);
        });
      }
    }
  };
  const showSymbol = (symbol, element) => {
    element.textContent = symbol;
  };
  return { displayBoard };
})();

const gameStarter = (() => {
  const start = () => {
    displayController.displayBoard();
  };
  return { start };
})();

const gameLogic = (() => {
  const PlayerTurnFunc = () => {
    PlayerTurnSystem.checkAndChangePlayer();
  };
  const displaySymbol = () => {
    if (playerTurn === "X") {
      PlayerTurnFunc();
      console.log("test");
      return "X";
    } else {
      PlayerTurnFunc();
      console.log("testing");
      return "O";
    }
  };
  return { PlayerTurnFunc, displaySymbol };
})();

const PlayerTurnSystem = (() => {
  const checkAndChangePlayer = () => {
    if (lastMove === "O") {
      lastMove = "X";
      playerTurn = "O";
    } else {
      lastMove = "O";
      playerTurn = "X";
    }
  };
  return { checkAndChangePlayer };
})();

gameStarter.start();
const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");
