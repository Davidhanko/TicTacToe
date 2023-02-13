let lastMove = "O",
  playerTurn = "X",
  gameOver = false;

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
  const getName = () => {
    return name;
  };
  const getSymbol = () => {
    return symbol;
  };

  return { getName, getSymbol };
};

const displayController = (() => {
  const displayBoard = () => {
    let board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        gameBoard.htmlBoard[i].children[j].addEventListener(
          "click",
          function display(e) {
            if (gameOver === false) {
              const element = e.target;
              const symbol = gameLogic.displaySymbol();
              showSymbol(symbol, element);
              gameBoard.setBoard(i, j, symbol);
              gameLogic.checkWinner();
              element.removeEventListener("click", display);
            }
          }
        );
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
  const collectData = () => {
    const button = document.getElementById("sentInfoData");
    button.addEventListener("click", () => {
      // PlayerData();
      document.getElementById("infoPopup").style.display = "none";
    });
  };
  return { start, collectData };
})();

const gameLogic = (() => {
  let counter = 0;
  const removeListeners = () => {
    gameOver = true;
  };
  const PlayerTurnFunc = () => {
    PlayerTurnSystem.checkAndChangePlayer();
  };
  const displaySymbol = () => {
    if (playerTurn === "X") {
      PlayerTurnFunc();
      return "X";
    } else {
      PlayerTurnFunc();
      return "O";
    }
  };
  const checkWinner = () => {
    let board = gameBoard.getBoard();
    let winner = "";
    if (boardIsFull() === 9) {
      winner = "tie";
    }
    for (let i = 0; i < board.length; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== ""
      ) {
        winner = board[i][0];
      }
    }
    for (let i = 0; i < board.length; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== ""
      ) {
        winner = board[0][i];
      }
    }
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== ""
    ) {
      winner = board[0][0];
    }
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== ""
    ) {
      winner = board[0][2];
    }
    gameEnd(winner);
  };

  const boardIsFull = () => {
    counter++;
    return counter;
  };

  const gameEnd = (winner) => {
    switch (winner) {
      case "tie":
        console.log("ITS A TIE!");
        removeListeners();
        break;
      case PlayerData[0].getSymbol():
        console.log(PlayerData[0].getName() + " wins.");
        removeListeners();
        break;
      case PlayerData[1].getSymbol():
        console.log(PlayerData[1].getName() + " wins.");
        removeListeners();
        break;
    }
  };

  return { PlayerTurnFunc, displaySymbol, checkWinner, boardIsFull };
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

const PlayerData = (() => {
  const player1 = player(
    document.getElementById("player1Name").value,
    document.getElementById("player1Symbol").value
  );
  const player2 = player(
    document.getElementById("player2Name").value,
    document.getElementById("player2Symbol").value
  );
  return [player1, player2];
})();

gameStarter.start();
