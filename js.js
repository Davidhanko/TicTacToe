//Code could be formated better, will get into it after I finish learning.

let lastMove,
  playerTurn,
  playerArray,
  winner,
  gameOver = false,
  useAI = true,
  AIgoesFirst = true;
const button = document.getElementById("sentInfoData");
const winnerAnn = document.getElementById("winnerAnnouncement");

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
  let board = gameBoard.getBoard();

  const canBePlaced = (i, j) => {
    return gameBoard.htmlBoard[i].children[j].textContent === "";
  };
  const displayBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        gameBoard.htmlBoard[i].children[j].addEventListener(
          "click",
          function display(e) {
            if (gameOver === false && canBePlaced(i, j)) {
              if (useAI === true && playerTurn === playerArray[1].getSymbol()) {
                const element = e.target;
                element.removeEventListener("click", display);
                const symbol = gameLogic.displaySymbol();
                gameBoard.setBoard(i, j, symbol);
                showSymbol(symbol, element);
                gameLogic.checkWinner();
                gameLogic.PlayerTurnFunc();
              }
            }
          }
        );
      }
    }
  };
  const resetBoard = () => {
    let board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        let old_element = gameBoard.htmlBoard[i].children[j];
        gameBoard.setBoard(i, j, "");
        gameBoard.htmlBoard[i].children[j].textContent = "";
        let new_element = old_element.cloneNode(false);
        old_element.parentNode.replaceChild(new_element, old_element);
      }
    }
  };

  const showSymbol = (symbol, element) => {
    element.textContent = symbol;
  };
  return { displayBoard, resetBoard };
})();

const gameStarter = (() => {
  const start = () => {
    displayController.displayBoard();
  };
  const collectData = () => {
    document.getElementById("infoPopup").style.display = "none";
    PlayerData();
    if (useAI) {
      AI.startAI();
    }
  };
  return { start, collectData };
})();

const gameLogic = (() => {
  let counter = 0;
  const removeListeners = () => {
    gameOver = true;
  };

  const assignDataPlayerMove = (playerArray) => {
    playerTurn = playerArray[0].getSymbol();
    return playerTurn;
  };
  const assignDataLastMove = (playerArray) => {
    lastMove = playerArray[1].getSymbol();
    return lastMove;
  };
  const PlayerTurnFunc = () => {
    PlayerTurnSystem.checkAndChangePlayer();
  };
  const displaySymbol = () => {
    if (playerTurn === playerArray[0].getSymbol()) {
      return playerArray[0].getSymbol();
    } else {
      return playerArray[1].getSymbol();
    }
  };
  const checkWinner = () => {
    let board = gameBoard.getBoard();
    winner = "";
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

  const gameEnd = () => {
    switch (winner) {
      case "tie":
        winnerAnn.textContent = "The game is a tie!";
        removeListeners();
        break;
      case playerArray[0].getSymbol():
        winnerAnn.textContent = `${playerArray[0].getName()} is victorious!`;
        removeListeners();
        break;
      case playerArray[1].getSymbol():
        winnerAnn.textContent = `${playerArray[1].getName()} is victorious!`;
        removeListeners();
        break;
    }
  };

  const reset = () => {
    gameOver = false;
    counter = 0;
    assignDataLastMove(playerArray);
    assignDataPlayerMove(playerArray);
    winner = "";
    winnerAnn.textContent = "";
    displayController.resetBoard();
    displayController.displayBoard();
  };

  return {
    PlayerTurnFunc,
    displaySymbol,
    checkWinner,
    boardIsFull,
    assignDataLastMove,
    assignDataPlayerMove,
    reset,
  };
})();

const PlayerTurnSystem = (() => {
  const checkAndChangePlayer = () => {
    if (lastMove === playerArray[1].getSymbol()) {
      lastMove = playerArray[0].getSymbol();
      playerTurn = playerArray[1].getSymbol();
    } else {
      lastMove = playerArray[1].getSymbol();
      playerTurn = playerArray[0].getSymbol();
      if (useAI === true) {
        AI.startAI();
      }
    }
  };
  return { checkAndChangePlayer };
})();

function PlayerData() {
  const player1 = player(
    document.getElementById("player1Name").value,
    document.getElementById("player1Symbol").value
  );
  const player2 = player(
    document.getElementById("player2Name").value,
    document.getElementById("player2Symbol").value
  );
  playerArray = [player1, player2];
  gameLogic.assignDataLastMove(playerArray);
  gameLogic.assignDataPlayerMove(playerArray);
  return playerArray;
}

const AI = (() => {
  let htmlBoard = gameBoard.htmlBoard;
  let friendlySymbol;
  let opponentSymbol;
  let hasAISymbols = false;
  let board = gameBoard.getBoard();
  let blockMove;

  const move = (i, j, symbol) => {
    if (htmlBoard[i].children[j].textContent === "") {
      gameBoard.setBoard(i, j, symbol);
      htmlBoard[i].children[j].textContent = symbol;
      gameLogic.checkWinner();
      PlayerTurnSystem.checkAndChangePlayer();
    } else startAI();
  };
  const getSymbols = () => {
    friendlySymbol = playerArray[0].getSymbol();
    opponentSymbol = playerArray[1].getSymbol();
    hasAISymbols = true;
  };
  const countRowCycles = (k) => {
    let blockingMove;
    let counter = 0;
    for (let i = 0; i < board.length; i++) {
      if (htmlBoard[i].children[k].textContent === opponentSymbol) {
        counter++;
      }
      if (counter === 2) {
        blockingMove = findEmptyTile(k, "R");
        return blockingMove;
      } else if (i === 2) {
        return false;
      }
    }
  };
  const countRow = () => {
    let block;
    block = countRowCycles(0);
    if (!block) {
      block = countRowCycles(1);
    }
    if (!block) {
      block = countRowCycles(2);
    }

    switch (block) {
      case "NO":
        blockMove = "NO";
        break;
      default:
        blockMove = block;
        break;
    }
  };

  const findEmptyTile = (j, type) => {
    if (type === "R") {
      for (let i = 0; i < board.length; i++) {
        if (htmlBoard[i].children[j].textContent === "") {
          if (
            `${i}${j}` === "00" ||
            `${i}${j}` === "01" ||
            `${i}${j}` === "02"
          ) {
            let holder = `${i}${j}`;
            holder = holder.substring(1);
          } else return `${i}${j}`;
        }
      }
    }
  };
  const startAI = () => {
    if (hasAISymbols === false) getSymbols();
    setTimeout(() => {
      logicAI();
    }, 100);
  };
  const AIMovesSet = () => {
    countRow();
    if (blockMove !== "NO" && blockMove !== undefined && blockMove !== false) {
      console.log(blockMove);
      switch (blockMove) {
        case "0":
          move(0, 0, friendlySymbol);
          console.log("BLOCK");
          break;
        case "10":
          move(1, 0, friendlySymbol);
          console.log("BLOCK");
          break;
        case "20":
          move(2, 0, friendlySymbol);
          console.log("BLOCK");
          break;
        case "1":
          move(0, 1, friendlySymbol);
          console.log("BLOCK");
          break;
        case "11":
          move(1, 1, friendlySymbol);
          console.log("BLOCK");
          break;
        case "21":
          move(2, 1, friendlySymbol);
          console.log("BLOCK");
          break;
        case "2":
          move(0, 2, friendlySymbol);
          console.log("BLOCK");
          break;
        case "12":
          move(1, 2, friendlySymbol);
          console.log("BLOCK");
          break;
        case "22":
          move(2, 2, friendlySymbol);
          console.log("BLOCK");
          break;
        default:
          break;
      }
    } else if (htmlBoard[1].children[1].textContent === "") {
      move(1, 1, friendlySymbol);
    } else if (
      htmlBoard[0].children[0].textContent === "" ||
      htmlBoard[2].children[0].textContent === "" ||
      htmlBoard[0].children[2].textContent === "" ||
      htmlBoard[2].children[2].textContent === ""
    ) {
      let random = Math.floor(Math.random() * 4);
      switch (random) {
        case 0:
          move(0, 0, friendlySymbol);
          break;
        case 1:
          move(2, 0, friendlySymbol);
          break;
        case 2:
          move(0, 2, friendlySymbol);
          break;
        case 3:
          move(2, 2, friendlySymbol);
          break;
      }
    } else if (
      htmlBoard[1].children[0].textContent === "" ||
      htmlBoard[0].children[1].textContent === "" ||
      htmlBoard[1].children[2].textContent === "" ||
      htmlBoard[2].children[1].textContent === ""
    ) {
      let random = Math.floor(Math.random() * 4);
      switch (random) {
        case 0:
          move(1, 0, friendlySymbol);
          break;
        case 1:
          move(0, 1, friendlySymbol);
          break;
        case 2:
          move(1, 2, friendlySymbol);
          break;
        case 3:
          move(2, 1, friendlySymbol);
          break;
      }
    }
  };
  const logicAI = () => {
    if (gameOver === false) {
      if (AIgoesFirst) {
        //goes first, always takes middle square
        if (htmlBoard[1].children[1].textContent === "") {
          move(1, 1, friendlySymbol);
        } else AIMovesSet();
      }
    }
  };

  return { startAI };
})();

gameStarter.start();
button.addEventListener("click", gameStarter.collectData);
